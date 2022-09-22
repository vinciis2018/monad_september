import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { warning_red_icon } from "assets/svgs";
import HPasswordInput from "components/atoms/HPasswordInput";
import { useWallet } from "components/contexts";
import { Box, Center, Stack, Text, Button } from "@chakra-ui/react";
import MessageBox from "components/atoms/MessageBox";

export function Recovery() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [activeBtn, setActiveBtn] = useState(false);
  const [pinFocus, setPinFocus] = useState(true);
  const [pin, setPin] = useState("");

  const { unlock } = useWallet();

  const activeFocusArea = () => {
    setPinFocus(true);
  };

  const completedPin = () => {
    setActiveBtn(true);
  };

  const onClick = async () => {
    if (activeBtn) {
      unlock(pin)
        .then(() => {
          navigate("/setting/phrase-view");
        })
        .catch(() => {
          setErr("PIN code is incorrect.");
        });
    } else {
      setErr("Please input PIN.");
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Text textAlign="center" p="2" fontSize="lg" fontWeight="600">
            Reveal Recovery Phrase
          </Text>
          <hr />
          <Box p="2" align="center">
            <img
              style={{ width: "35px" }}
              src={warning_red_icon}
              alt="warning"
            />
            <Text textAlign="center" fontSize="sm">
              Never disclose your recovery phrase.
              <br />
              Anyone with this phrase can steal from your wallet.
            </Text>
          </Box>
          {err && <MessageBox variant="danger">{err}</MessageBox>}

          <Box align="center" onClick={activeFocusArea}>
            <Text fontSize="xs">Enter your secret PIN</Text>
            <HPasswordInput
              label="Connfirm Access PIN"
              onChange={setPin}
              onComplete={() => completedPin()}
              focused={pinFocus}
              labelAlign="left"
            />
          </Box>
          <Button variant="outline" color="violet.500" onClick={onClick}>
            Reveal Recovery Phrase
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
