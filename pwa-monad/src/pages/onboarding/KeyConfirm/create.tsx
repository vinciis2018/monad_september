import { useState } from "react";
// hooks
import { useWallet, useBackup } from "components/contexts";

import HLoading from "components/atoms/HLoading";
import { useNavigate } from "react-router-dom";
import { suffleArray } from "utils/util";
import MessageBox from "components/atoms/MessageBox";
import { Box, Center, Flex, Stack, Text, Button } from "@chakra-ui/react";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineWarning,
} from "react-icons/ai";

export default function KeyCheck() {
  const navigate = useNavigate();
  const { setShowBackup } = useBackup();
  const { mnemonics, isLoading } = useWallet();

  const [suggestKeys, setSuggestKeys] = useState(
    suffleArray(mnemonics?.split(" ") || [])
  );
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [err, setErr] = useState("");

  const onClick = async () => {
    if (selectedKeys.length !== 12) {
      setErr("Please select 12 words");
    } else {
      setErr("");
      if (selectedKeys.join(" ") === mnemonics) {
        navigate("/pin-create");
      } else {
        setErr("Mnemonics does not match!");
      }
    }
  };

  const selectKey = (aKey: string) => {
    setSuggestKeys(suggestKeys.filter((k) => k !== aKey));
    setSelectedKeys(selectedKeys.concat([aKey]));
  };
  const removeKey = (aKey: string) => {
    setSelectedKeys(selectedKeys.filter((k) => k !== aKey));
    setSuggestKeys(suggestKeys.concat([aKey]));
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <HLoading loading={isLoading} />
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
            <AiOutlineWarning fontSize="50px" color="red" />
            <Text p="2">
              Never disclose your recovery phrase.
              <br /> Anyone with this phrase can steal from your wallet
            </Text>
            <Text p="2" fontSize="sm">
              {" "}
              Tap the words to re-enter your recovery phrase in the correct
              order.
            </Text>
            <Box>
              {selectedKeys.map((ph) => (
                <div key={ph} onClick={() => removeKey(ph)}>
                  {ph}
                </div>
              ))}
            </Box>
            <Box>
              {suggestKeys.map((ph) => (
                <div key={ph} onClick={() => selectKey(ph)}>
                  {ph}
                </div>
              ))}
            </Box>
          </Box>
          {isLoading && <HLoading loading={isLoading} />}
          {err && <MessageBox variant="danger">{err}</MessageBox>}
          <Button variant="outline" color="violet.500" onClick={onClick}>
            Continue
          </Button>
          <Box
            onClick={() => setShowBackup(true)}
            className="mt-15 text-center pb-30"
          >
            <Text p="2" textAlign="center" fontSize="sm">
              Skip backup for now
            </Text>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
