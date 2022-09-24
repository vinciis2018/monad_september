import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// hooks
import { useWallet, useLogin } from "components/contexts";
import HPasswordInput from "components/atoms/HPasswordInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ERROR_IDS } from "utils/constants";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import {
  Box,
  Tooltip,
  Image,
  Center,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useLogin();
  const [err, setErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  // const [pinFocus, setPinFocus] = useState(true);
  const [pin, setPin] = useState("");
  const target = searchParams.get("target");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const {
    unlock,
    checkAndTriggerSelfDestruct,
    generateAndSave,
    wipeTempSavedPin,
  } = useWallet();

  const onClick = () => {
    checkPin(pin);
  };

  const checkPin = (pincode: string) => {
    if (pincode !== "") {
      checkAndTriggerSelfDestruct(pincode).then((cleared) => {
        // console.log(cleared);
        if (cleared) {
          // TODO: On Self Destruct App should be populated with safe content
          navigate("/");
        } else {
          unlock(pincode)
            .then(async () => {
              const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
              await login(expired);
              if (target) {
                navigate("/" + target);
              } else {
                navigate("/setting");
              }
            })
            .catch((error: Error) => {
              if (error.message.includes(ERROR_IDS.NO_CONTENT)) {
                wipeTempSavedPin().then(() => generateAndSave(pin));
                navigate("/");
              }

              if (error.message.includes(ERROR_IDS.INCORRECT_PIN)) {
                setErr("PIN code is not match. Please try again.");
                setPin("");
              }
            });
        }
      });
    } else {
      setErr("Please input PIN.");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  // const activeFocusArea = () => {
  //   setPinFocus(true);
  // };

  const completedPin = (value: string) => {
    setActiveBtn(true);
    checkPin(value);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pt="10" pb="8">
        {loading ? (
          <HLoading loading={loading} />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Stack align="center" p="8" rounded="lg" shadow="card">
            {/* {userInfo?.defaultWallet === undefined ||
              (null && <Text color="black.500">{userInfo.defaultWallet}</Text>)} */}
            {err && <MessageBox variant="danger">{err}</MessageBox>}
            <Stack>
              <Text
                p="2"
                fontSize="lg"
                color="black.500"
                textAlign="center"
                fontWeight="600"
              >
                Please login to continue
              </Text>
              <hr />
              {/* <Text>{userInfo.defaultWallet}</Text> */}

              <Tooltip
                rounded="lg"
                shadow="card"
                bgColor="violet.500"
                p="4"
                label="paisa hi paisa hoga"
                aria-label="A tooltip"
              >
                <Image
                  alt="paisa hi paisa hoga"
                  p="4"
                  src={`https://cdna.iconscout.com/img/get-started.23be618.png?w=500&h=0&f=png`}
                />
              </Tooltip>
              <Box align="center">
                <hr />
                <Text
                  textAlign="center"
                  px="4"
                  pt="4"
                  fontSize="xs"
                  color="black.500"
                  fontWeight="600"
                >
                  Enter your 6 digit secret pin
                </Text>
                <HPasswordInput
                  label="Enter Access PIN"
                  onChange={setPin}
                  onComplete={completedPin}
                  labelAlign="center"
                />
              </Box>
            </Stack>
            {activeBtn && (
              <Button
                variant="outline"
                width="50%"
                color="violet.500"
                onClick={onClick}
              >
                Log In
              </Button>
            )}
          </Stack>
        )}
      </Center>
    </Box>
  );
}
