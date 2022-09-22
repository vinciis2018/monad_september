import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";

//TODO: Remove it
export function KeyManagement() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/key-phrase-save");
  };
  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate(`/setting`)}
            />
            <Text fontSize="lg" fontWeight="600">
              Welcome to Monad
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          <Text p="4" fontSize="sm" textAlign="center">
            Get a cryptographically secured key so that you can create and{" "}
            <br />
            permanently archive content while staying anonymous.
          </Text>

          <Text color="green" p="4" textAlign="center">
            Already have a wallet? Connect your existing key with a <br />
            <strong onClick={() => navigate("/key-recovery")}>
              RECOVERY PHRASE
            </strong>
            <br />
            We only accept finnie* compatible wallets for now
          </Text>
          <Button m="4" variant="outline" color="violet.500" onClick={onClick}>
            Get a Key
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
