import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HPasswordInput from "components/atoms/HPasswordInput";
// hooks
import { useWallet } from "components/contexts";
import { Box, Center, Flex, Stack, Button, Text } from "@chakra-ui/react";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineWarning,
  // AiOutlineCheck,
} from "react-icons/ai";
import MessageBox from "components/atoms/MessageBox";

export function SelfDestructPin() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [accessPinFocus, setAccessPinFocus] = useState(true);
  const [accessPin, setAccessPin] = useState("");
  const [destructPinFocus, setDestructPinFocus] = useState(false);
  const [destructPin, setDestructPin] = useState("");
  const [destructPinConfirmFocus, setDestructPinConfirmFocus] = useState(false);
  const [destructPinConfirm, setDestructPinConfirm] = useState("");

  const { unlock, setSelfDestructPin } = useWallet();

  const onClick = async () => {
    if (accessPin === "") {
      setErr("Please input current PIN.");
    } else if (destructPin === "" || destructPinConfirm === "") {
      setErr("Please input PIN triggering Self Destruct");
    } else if (destructPin !== destructPinConfirm) {
      setErr("Self Destruct PINs don't match, please try again.");
    } else {
      unlock(accessPin)
        .then(() => setSelfDestructPin(destructPin))
        .then(() => navigate("/setting/self-destruct-pin-success"))
        .catch(() => {
          setErr("Access PIN is incorrect.");
        });
    }
  };

  const activeFocusArea = (element: string = "old") => {
    if (element === "old") {
      setAccessPinFocus(true);
      setDestructPinFocus(false);
      setDestructPinConfirmFocus(false);
    } else if (element === "create") {
      setAccessPinFocus(false);
      setDestructPinFocus(true);
      setDestructPinConfirmFocus(false);
    } else {
      setAccessPinFocus(false);
      setDestructPinFocus(false);
      setDestructPinConfirmFocus(true);
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate(`/key-management`)}
            />
            <Text fontSize="lg" fontWeight="600">
              Self Destruct PIN
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/setting`)}
            />
          </Flex>
          <hr />
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Text fontSize="sm" align="center">
            Create a PIN that will
            <strong>delete all app data from your device</strong>
            <br />
            when you log in. <strong>will only delete the data</strong>, not
            app.
          </Text>
          <Text p="2" fontSize="xs" textAlign="center">
            Use your{" "}
            <strong onClick={() => navigate("/setting/update-pin")}>
              recovery phrase
            </strong>{" "}
            access your data from any device at a later date.
          </Text>
          {err && <MessageBox variant="danger">{err}</MessageBox>};
          <Box align="center" onClick={() => activeFocusArea("old")}>
            <Text px="8" fontSize="xs">
              Enter your old self destruction PIN
            </Text>
            <HPasswordInput
              label="Enter Access PIN"
              onChange={setAccessPin}
              onComplete={() => activeFocusArea("create")}
              focused={accessPinFocus}
              labelAlign="left"
            />
          </Box>
          <Box align="center" onClick={() => activeFocusArea("create")}>
            <Text px="8" fontSize="xs">
              Create your new self destruction PIN
            </Text>
            <HPasswordInput
              label="Create"
              onChange={setDestructPin}
              onComplete={() => activeFocusArea("confirm")}
              focused={destructPinFocus}
              labelAlign="left"
              type="Self-Destruct PIN"
            />
          </Box>
          <Box align="center" onClick={() => activeFocusArea("confirm")}>
            <Text px="8" fontSize="xs">
              Confirm your new self destruction PIN
            </Text>
            <HPasswordInput
              label="Confirm"
              onChange={setDestructPinConfirm}
              focused={destructPinConfirmFocus}
              labelAlign="left"
              type="Self-Destruct PIN"
            />
          </Box>
          <Button
            width="100%"
            m="4"
            variant="outline"
            onClick={onClick}
            leftIcon={<AiOutlineWarning fontSize="20" color="red" />}
          >
            Update Self-Destruct PIN
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
