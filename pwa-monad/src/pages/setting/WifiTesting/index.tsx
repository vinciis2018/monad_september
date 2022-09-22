import { useNavigate } from "react-router-dom";
import { warning_red_icon } from "assets/svgs";
import {
  Box,
  Center,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";

export function WifiTesting() {
  const navigate = useNavigate();

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box>
            <Flex p="4" justify="space-between" align="center">
              <AiOutlineArrowLeft
                size="20px"
                color="black"
                onClick={() => navigate("/setting")}
              />
              <Text fontSize="lg" fontWeight="600">
                Turn Off WiFi
              </Text>
              <AiOutlineCloseCircle
                size="20px"
                color="black"
                onClick={() => navigate(`/setting`)}
              />
            </Flex>
            <hr />
            <Box p="4" align="center">
              <img src={warning_red_icon} alt="warning" />
              <Text>
                Turn off your WiFi if you are on a public or unsecured network.
                <br />
                Accessing a public WiFi connection is an easy way to steal your
                recovery phrase.
              </Text>
              <hr />
              <SimpleGrid pt="4" columns={[1, 2]} gap="4">
                <Button
                  variant="outline"
                  color="violet.500"
                  onClick={() => navigate("/setting")}
                >
                  Go to WiFi Settings
                </Button>
                <Button
                  bgColor="violet.500"
                  onClick={() => navigate("/setting/recovery")}
                >
                  My Network is Secure
                </Button>
              </SimpleGrid>
            </Box>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
