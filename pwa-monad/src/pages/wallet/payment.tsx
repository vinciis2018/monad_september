import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Stack,
  Flex,
  Text,
  // Center,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  // Button,
} from "@chakra-ui/react";

import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import { PaymentGateway } from "components/common";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { detailsUser } from "Actions/userActions";
import { getAdCredits, getWalletDetails } from "Actions/walletActions";

export function Payment() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [receipt, setReceipt] = useState("");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;

  const walletDetails = useSelector((state: any) => state.walletDetails);
  const {
    loading: loadingWalletDetails,
    error: errorWalletDetails,
    wallet,
  } = walletDetails;

  const adCreditsGet = useSelector((state: any) => state.adCredits);
  const {
    // loading: loadingAdCredits,
    // error: errorAdCredits,
    data: adCredits,
  } = adCreditsGet;

  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (userInfo) {
      dispatch(
        detailsUser({
          userId: userInfo?._id,
          walletAddress: userInfo.defaultWallet,
        })
      );
      dispatch(getWalletDetails(userInfo.defaultWallet));
      dispatch(getAdCredits());
    }
    console.log(adCredits);
  }, [adCredits, dispatch, userInfo]);

  return (
    <Box px="2" py="20" color="black.500">
      <Box maxW="container.lg" mx="auto" pb="8">
        {loadingUser ? (
          <HLoading loading={loadingUser} />
        ) : errorUser ? (
          <MessageBox variant="danger">{errorUser}</MessageBox>
        ) : (
          <Stack>
            <Flex p="4" justify="space-between" align="center">
              <AiOutlineUser
                size="20px"
                color="black"
                onClick={() => navigate(`/`)}
              />
              <Text fontSize="lg" fontWeight="600">
                Ad Credits
              </Text>
              <AiOutlineUpload
                size="20px"
                color="black"
                onClick={() => navigate(`/upload`)}
              />
            </Flex>
            <hr />
            {loadingWalletDetails ? (
              <HLoading loading={loadingWalletDetails} />
            ) : errorWalletDetails ? (
              <MessageBox variant="danger">{errorWalletDetails}</MessageBox>
            ) : (
              <Stack>
                <SimpleGrid gap="2" columns={[1, 2]}>
                  <Box shadow="card" p="4" rounded="lg">
                    <Text
                      p="2"
                      textAlign="center"
                      fontSize="md"
                      fontWeight="600"
                    >
                      Add Paymeny Details
                    </Text>
                    <hr />
                    <FormControl p="2" id="name">
                      <FormLabel px="1" fontSize="xs">
                        Amount
                      </FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="amount"
                          onChange={(e: any) => setAmount(e.target.value)}
                          // placeholder={name}
                          value={amount}
                          type="number"
                        />
                      </Stack>
                    </FormControl>
                    <FormControl p="2" id="name">
                      <FormLabel px="1" fontSize="xs">
                        Currency
                      </FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="currency"
                          onChange={(e: any) => setCurrency(e.target.value)}
                          placeholder={currency}
                          value={currency}
                          type="string"
                        />
                      </Stack>
                    </FormControl>
                    <FormControl p="2" id="name">
                      <FormLabel px="1" fontSize="xs">
                        Receipt
                      </FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="receipt"
                          onChange={(e: any) => setReceipt(e.target.value)}
                          placeholder={receipt}
                          value={receipt}
                          type="string"
                        />
                      </Stack>
                    </FormControl>
                  </Box>
                  <Box shadow="card" p="4" rounded="lg">
                    <PaymentGateway
                      userInfo={user.user}
                      amount={amount * 100}
                      currency={currency}
                      receipt={receipt}
                    />
                  </Box>
                </SimpleGrid>
                <hr />
                <Stack>
                  <Text p="2">My Transactions</Text>
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
