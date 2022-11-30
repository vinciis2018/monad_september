import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Stack,
  Flex,
  Text,
  Center,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Calendar from "react-calendar";

import { AiOutlineUser, AiOutlineUpload } from "react-icons/ai";
import { PaymentGateway } from "components/common";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { detailsUser } from "Actions/userActions";

export function Payment() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [receipt, setReceipt] = useState("");

  const [date, setDate] = useState(new Date());
  const [am, setAm] = useState(true);
  const [timeSelect, setTimeSelect] = useState(false);

  const hrTime = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;

  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (userInfo) {
      dispatch(
        detailsUser({
          userId: userInfo?._id,
          walletAddress: userInfo.defaultWallet,
        })
      );
    }
  }, [dispatch, userInfo]);

  return (
    <Box px="2" pt="20" color="black">
      <Center maxW="container.lg" pt="10" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineUser
              size="20px"
              color="black"
              onClick={() => navigate(`/`)}
            />
            <Text fontSize="lg" fontWeight="600">
              Create Video
            </Text>
            <AiOutlineUpload
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          {loadingUser ? (
            <HLoading loading={loadingUser} />
          ) : errorUser ? (
            <MessageBox variant="danger">{errorUser}</MessageBox>
          ) : (
            <Stack>
              <Calendar
                onChange={setDate}
                defaultValue={date}
                // selectRange={true}
                minDetail="month"
                minDate={new Date()}
              />
              <Text>{date ? date.toString() : ""}</Text>
              <SimpleGrid px="2" gap="2" columns={[2]}>
                <Button>AM</Button>
                <Button>PM</Button>
              </SimpleGrid>
              <Flex justify="space-between">
                <Stack p="2" width="25%">
                  {hrTime.map((t: any) => (
                    <Box
                      onClick={() => setTimeSelect(true)}
                      p="1"
                      color="violet.500"
                      border="1px"
                      rounded="sm"
                    >
                      <Text p="0.2px" fontSize="xs" textAlign="center">
                        {t}:00 - {t + 1}:00
                      </Text>
                    </Box>
                  ))}
                </Stack>
                {!timeSelect ? (
                  <Box width="75%" m="2" p="4" shadow="card" rounded="lg">
                    <Text>Please click on time to see the playlist</Text>
                  </Box>
                ) : (
                  <Box width="75%" m="2" p="4" shadow="card" rounded="lg">
                    <Text>Details</Text>
                  </Box>
                )}
              </Flex>
              <FormControl p="2" id="name">
                <Stack direction="row" align="center">
                  <Input
                    id="amount"
                    onChange={(e: any) => setAmount(e.target.value)}
                    // placeholder={name}
                    value={amount}
                    type="number"
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">
                  Amount
                </FormLabel>
              </FormControl>
              <FormControl p="2" id="name">
                <Stack direction="row" align="center">
                  <Input
                    id="currency"
                    onChange={(e: any) => setCurrency(e.target.value)}
                    placeholder={currency}
                    value={currency}
                    type="string"
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">
                  Currency
                </FormLabel>
              </FormControl>
              <FormControl p="2" id="name">
                <Stack direction="row" align="center">
                  <Input
                    id="receipt"
                    onChange={(e: any) => setReceipt(e.target.value)}
                    placeholder={receipt}
                    value={receipt}
                    type="string"
                  />
                </Stack>
                <FormLabel px="1" fontSize="xs">
                  Receipt
                </FormLabel>
              </FormControl>
              <PaymentGateway
                userInfo={user.user}
                amount={amount * 100}
                currency={currency}
                receipt={receipt}
              />
            </Stack>
          )}
        </Stack>
      </Center>
    </Box>
  );
}
