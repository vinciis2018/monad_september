import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  // Tooltip,
  // Checkbox,
  // Input,
  // Image,
  Center,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineUpload /*AiOutlineClose*/,
} from "react-icons/ai";

import BarcodeScannerComponent from "react-qr-barcode-scanner";

export function Scanner() {
  const navigate = useNavigate();
  const [data, setData] = useState("Not Found");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const dispatch = useDispatch<any>();

  useEffect(() => {}, []);

  return (
    <Box px="2" pt="20" color="black">
      <Center maxW="container.lg" pt="10" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineUser
              size="20px"
              color="black"
              onClick={() =>
                navigate(
                  `/userProfile/${userInfo._id}/${userInfo.defaultWallet}`
                )
              }
            />
            <Text fontSize="lg" fontWeight="600">
              Sanner
            </Text>
            <AiOutlineUpload
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err: any, result: any) => {
              if (result) setData(result.text);
              else setData("Not Found");
            }}
          />
          <p>{data}</p>
        </Stack>
      </Center>
    </Box>
  );
}
