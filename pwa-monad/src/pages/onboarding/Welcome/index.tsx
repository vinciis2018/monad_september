/* eslint-disable no-console */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWallet } from "components/contexts";
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
import HLoading from "components/atoms/HLoading";

export function Welcome() {
  const navigate = useNavigate();

  const { hasEncryptedData } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  useEffect(() => {
    hasEncryptedData().then((hasData) => {
      console.log(hasData);
      if (hasData) {
        // navigate("/login");
      }
      if (!userInfo) {
        navigate("/signin");
      }
    });
  }, [hasEncryptedData, navigate, userInfo]);

  const onClick = () => {
    navigate("/pin-create");
  };
  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pt="10" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
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

          <Text px="4" textAlign="center" fontSize="lg" fontWeight="600">
            Welcome to Monad
          </Text>
          {loading && <HLoading loading={loading} />}
          {error && <MessageBox>{error}</MessageBox>}
          {userInfo && (
            <Box align="center">
              <Text px="4" fontSize="sm">
                Hey {userInfo.name}, thank you for your registration.
                <br />
                Please follow the instruction process for creating your finnie
                wallet on Monad.
              </Text>
            </Box>
          )}
          <Tooltip
            rounded="lg"
            shadow="card"
            bgColor="violet.500"
            p="4"
            label="ads becho, ads dekho"
            aria-label="A tooltip"
          >
            <Image
              onClick={onClick}
              alt="ads dekho, ads becho"
              p="4"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/marketing-campaign-3025712-2526910.png"
            />
          </Tooltip>
          <Button
            width="100%"
            variant="outline"
            color="violet.500"
            onClick={onClick}
          >
            Get Started
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
