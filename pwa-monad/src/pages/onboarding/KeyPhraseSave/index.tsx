import { useState } from "react";

import koii_large from "assets/koii.png";
import mona_large from "assets/logo.png";
import CryptoBoard from "components/atoms/CryptoBoard";
import HLoading from "components/atoms/HLoading";
import { useNavigate } from "react-router-dom";
import { useWallet, useBackup } from "components/contexts";
import {
  Box,
  Center,
  Flex,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";

export function KeyPhraseSave() {
  const navigate = useNavigate();
  const { setShowBackup } = useBackup();
  const [showKeys, setShowKeys] = useState<boolean>(false);
  const { mnemonics, isLoading } = useWallet();
  // console.log(mnemonics);

  const onClick = async () => {
    navigate("/key-confirm");
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
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

          <Text align="center" fontWeight="" p="2" fontSize="xs">
            Grab a pen and paper and keep your recovery phrase somewhere safe.
            <br />
            Try to keep it off any internet-connected device.
            <br />
            Please keep patience and let the key phrase load, it may take a
            {/* little while... */}
          </Text>
          <Box align="center">
            <AiOutlineWarning fontSize="50" color="red" />
          </Box>
          <Text align="center" fontWeight="600" p="2" fontSize="sm">
            Never disclose your recovery phrase.
            <br />
            Anyone with this phrase can steal from your wallet.
          </Text>
          <hr />
          {isLoading ? (
            <HLoading loading={isLoading} />
          ) : (
            <Box onClick={() => setShowKeys(!showKeys)}>
              {mnemonics && (
                <Stack align="center">
                  {showKeys && (
                    <>
                      {/* <Text>{mnemonics.split(" ")}</Text> */}
                      <CryptoBoard mnemonics={mnemonics} />
                    </>
                  )}
                  {!showKeys && (
                    <>
                      <Text
                        textAlign="center"
                        fontWeight="600"
                        fontSize="xl"
                        p="5"
                        color="violet"
                      >
                        When you have a pen & paper ready. tap to reveal phrase.
                      </Text>
                      {/* <CryptoBoard
                        mnemonics={mnemonics}
                        sx={{ filter: "blur(4px)", background: "none !important" }}
                      /> */}
                    </>
                  )}
                  <Text
                    onClick={() => setShowBackup(true)}
                    p="4"
                    color="red"
                    fontWeight="600"
                    textAlign="center"
                  >
                    I don’t have a pen, skip back up for now.
                  </Text>
                  <Button
                    width="100%"
                    variant="outline"
                    color="violet.500"
                    onClick={onClick}
                  >
                    {" "}
                    Continue
                  </Button>
                </Stack>
              )}
            </Box>
          )}
        </Stack>
      </Center>
    </Box>
  );
}
