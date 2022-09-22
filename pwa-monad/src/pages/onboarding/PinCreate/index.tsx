import { useRef, useState, useEffect } from "react";
// hooks
import { useWallet } from "components/contexts";
import { useNavigate } from "react-router-dom";
import HPasswordInput from "components/atoms/HPasswordInput";
import ReactCodeInput from "react-code-input";
import {
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Center,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import koii_large from "assets/koii.png";
import mona_large from "assets/logo.png";
import MessageBox from "components/atoms/MessageBox";

export function PinCreate() {
  const pinInputRef = useRef<ReactCodeInput>(null);
  const confirmInputRef = useRef<ReactCodeInput>(null);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [createPinFocus, setCreatePinFocus] = useState(true);
  const [createPincode, setCreatePin] = useState("");
  const [confirmPinFocus, setConfirmPinFocus] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");

  const { tempSavePin } = useWallet();

  const onClick = async () => {
    if (createPincode === "" || confirmPin === "") {
      setErr("Please input PIN.");
    } else if (createPincode !== confirmPin) {
      setErr("Access PINs don't match, please try again.");
    } else {
      await tempSavePin(createPincode);
      navigate("/pin-success");
    }
  };

  const activeFocusArea = (element: string = "create") => {
    if (element === "create") {
      setCreatePinFocus(true);
      setConfirmPinFocus(false);
    } else {
      setCreatePinFocus(false);
      setConfirmPinFocus(true);
    }
  };

  const completedCreatePin = () => {
    // @ts-ignore
    confirmInputRef.current.textInput[0].focus();
  };

  useEffect(() => {
    // @ts-ignore
    if (pinInputRef) pinInputRef.current.textInput[0].focus();
  }, [pinInputRef]);

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pt="10" pb="8">
        <Stack pt="100" p="8" rounded="lg" shadow="card">
          <Box align="center">
            <Image width="15%" src={mona_large} />
            <Flex px="2" justify="center" align="center">
              <Text p="2" fontSize="xs">
                Powered by
              </Text>
              <Image width="3%" src={koii_large} />
            </Flex>
          </Box>
          <hr />
          <Text textAlign="center" px="4" fontSize="xl" fontWeight="600">
            Create Your Secret Wallet PIN
          </Text>
          <Tooltip
            rounded="lg"
            shadow="card"
            bgColor="violet.500"
            p="4"
            label="kisi ko batana ni"
            aria-label="A tooltip"
          >
            <Image
              alt="kisi ko batana ni"
              p="4"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/no-message-3025708-2526906.png"
            />
          </Tooltip>

          <Box py="2" px="0" align="center">
            <Text
              textAlign="center"
              px="4"
              pt="4"
              fontSize="sm"
              fontWeight="600"
            >
              DONOT DISCLOSE YOUR PIN TO ANYONE
            </Text>
            <Box align="center">
              <Text
                textAlign="center"
                px="4"
                pt="4"
                fontSize="xs"
                fontWeight="600"
              >
                Enter your 6 digit secret pin
              </Text>
              <HPasswordInput
                label="Create Access PIN"
                onChange={setCreatePin}
                onComplete={() => completedCreatePin()}
                focused={createPinFocus}
                ref={pinInputRef}
                onFocus={() => activeFocusArea("create")}
                labelAlign="left"
              />
            </Box>
            <Box align="center">
              <Text
                textAlign="center"
                px="4"
                pt="4"
                fontSize="xs"
                fontWeight="600"
              >
                Confirm your 6 digit secret pin
              </Text>
              <HPasswordInput
                label="Confirm Access PIN"
                onChange={setConfirmPin}
                focused={confirmPinFocus}
                onFocus={() => {
                  activeFocusArea("confirm");
                }}
                labelAlign="left"
                ref={confirmInputRef}
                autoFocus={false}
              />
            </Box>
            {err !== "" ? (
              <MessageBox variant="danger">{err}</MessageBox>
            ) : (
              <span>&nbsp;</span>
            )}

            <Button
              m="4"
              variant="outline"
              color="violet.500"
              width="75%"
              onClick={onClick}
            >
              Create Pin
            </Button>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
