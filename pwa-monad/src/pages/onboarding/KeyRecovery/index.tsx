import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// hooks
import { useWallet } from "components/contexts";
import { useNavigate } from "react-router-dom";
import HLoading from "components/atoms/HLoading";
import {
  Box,
  Tooltip,
  Image,
  Input,
  Center,
  Flex,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import MessageBox from "components/atoms/MessageBox";
import { createWallet } from "../../../Actions/walletActions";
import { signout } from "../../../Actions/userActions";

export function KeyRecovery() {
  const navigate = useNavigate();
  const [userMnemonics, setUserMnemonics] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { register } = useLogin();

  const {
    // setupPin,
    // generateAndSave,
    importAndSave,
    getTempSavedPin,
    wipeTempSavedPin,
    getArweavePublicAddress,
  } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch<any>();

  const onClick = async () => {
    const keys = userMnemonics.split(" ");
    if (keys.filter((k) => k !== "").length !== 12) {
      setErr("You should input 12 words. Try again.");
    } else {
      setLoading(true);
      getTempSavedPin().then((pin) => {
        if (pin) {
          wipeTempSavedPin()
            .then(() => importAndSave(pin, userMnemonics))
            .then(() => {
              setErr("");
              const defWallet = getArweavePublicAddress();
              if (userInfo?.defaultWallet === undefined || null || "") {
                dispatch(createWallet(defWallet));
                dispatch(signout());
              }
              navigate("/upload");
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          navigate("/pin-create");
        }
      });
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <HLoading loading={loading} />
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate(`/key-management`)}
            />
            <Text fontSize="lg" fontWeight="600">
              Welcome to Finnie
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/setting`)}
            />
          </Flex>
          <hr />
          <Box p="2" align="center">
            <Tooltip
              rounded="lg"
              shadow="card"
              bgColor="violet.500"
              p="2"
              label="paisa hi paisa hoga"
              aria-label="A tooltip"
            >
              <Box align="center">
                <Image
                  alt="paisa hi paisa hoga"
                  p="4"
                  src={`https://cdn3d.iconscout.com/3d/premium/thumb/reading-book-3025706-2526904.png`}
                />
              </Box>
            </Tooltip>
            <Text fontSize="sm" p="2">
              Never disclose your recovery phrase.
              <br />
              Anyone with this phrase can steal from your wallet.
            </Text>
          </Box>
          <Box p="">
            {err && <MessageBox variant="danger">{err}</MessageBox>}
            {loading && <HLoading loading={loading} />}
            <Input
              placeholder="Enter your recovery phrase"
              onChange={(e: any) => setUserMnemonics(e.target.value)}
            />
          </Box>
          <Button mx="4" variant="outline" color="violet.500" onClick={onClick}>
            Continue
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
