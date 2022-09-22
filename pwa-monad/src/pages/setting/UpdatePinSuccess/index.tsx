import { useNavigate } from "react-router-dom";
import { Box, Center, Stack, Text, Button } from "@chakra-ui/react";
import { AiOutlineSetting } from "react-icons/ai";

export function UpdatePinSuccess() {
  const navigate = useNavigate();

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box bgColor="" align="center">
            <AiOutlineSetting size="20px" color="black" />
          </Box>
          <Text color="green" txtAlign="center">
            Your Wallet Password updated successfully.
          </Text>
          <Text textAlign="center">Remember, don't share it with anyone.</Text>
          <Button
            variant="outline"
            color="violet.500"
            onClick={() => navigate("/setting")}
          >
            Back To Settings
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
