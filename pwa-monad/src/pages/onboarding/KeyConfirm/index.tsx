import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import { getUniqueRandomNumbersArray, splitArrayIntoHalf } from "utils/util";

import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";

import { KeyPhraseItem } from "./components/KeyPhraseItem";
import { Box, Center, Flex, Stack, Text, Button } from "@chakra-ui/react";
import MessageBox from "components/atoms/MessageBox";

const hiddenKeyPhrasesKeys = getUniqueRandomNumbersArray(3, 11);

export function KeyConfirm() {
  const { mnemonics, isLoading } = useWallet();
  const navigate = useNavigate();
  const { setSeedPhraseSaved } = useLogin();
  const [mnemonicsArray, setMnemonicsArray] = useState<string[]>([]);
  const [error, setErr] = useState("");

  const [hiddenPhrasesValues, setHiddenPhrasesValues] = useState(
    hiddenKeyPhrasesKeys.reduce<Record<string, string>>(
      (acc, hiddenWordIndex) => ({ ...acc, [hiddenWordIndex]: "" }),
      {}
    )
  );

  useEffect(() => {
    if (mnemonics) {
      setMnemonicsArray(mnemonics.split(" "));
    }
  }, [mnemonics]);

  const phrasesPairsMatches = useCallback(() => {
    const withMatchedPhrases = mnemonicsArray.map((mnemonic, index) => {
      if (hiddenKeyPhrasesKeys.includes(index)) {
        return hiddenPhrasesValues[index];
      }
      return mnemonic;
    });

    return withMatchedPhrases.join(" ") === mnemonics;
  }, [mnemonicsArray, mnemonics, hiddenPhrasesValues]);

  const onConfirm = async () => {
    if (phrasesPairsMatches()) {
      setSeedPhraseSaved();
      window.alert("Key Phrase Saved");
      navigate("/upload");
    } else {
      setErr("Please input matched characters");
    }
  };

  const { firstHalf: leftRowMnemonics, secondHalf: rightRowMnemonics } =
    useMemo(() => splitArrayIntoHalf(mnemonicsArray), [mnemonicsArray]);

  const renderKeyPhrase = (keyword: string, index: number) => {
    const isInput = hiddenKeyPhrasesKeys.includes(index);
    const inputValue = hiddenPhrasesValues[index];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setHiddenPhrasesValues({
        ...hiddenPhrasesValues,
        [index]: e.target.value,
      });

    return (
      <KeyPhraseItem
        key={keyword}
        keyword={keyword}
        isInput={isInput}
        label={`${index + 1}`}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
    );
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
              Welcome to Monad
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/setting`)}
            />
          </Flex>
          <hr />
          <Text textAlign="center" p="2" fontSize="sm">
            Store your recovery phrase somewhere safe.
            <br />
            This phrase makes it easy to restore your account.
          </Text>
          <Text textAlign="center" p="2" fontSize="">
            Never disclose your recovery phrase.
            <br />
            Anyone with this phrase can steal from your wallet.
          </Text>
          {isLoading && <HLoading loading={isLoading} />}
          {error !== "" && <MessageBox variant="danger">{error}</MessageBox>}
          <Flex align="center" justify="space-between">
            <Box flex={1}>
              {leftRowMnemonics.map((keyword, index) => {
                return renderKeyPhrase(keyword, index);
              })}
            </Box>
            <Box flex={1}>
              {rightRowMnemonics.map((keyword, index) => {
                // moving 6 positions, as this is second half of the array
                index = index + 6;
                return renderKeyPhrase(keyword, index);
              })}
            </Box>
          </Flex>
          <Button variant="outline" color="violet.500" onClick={onConfirm}>
            Continue
          </Button>
        </Stack>
      </Center>
    </Box>
  );
}
