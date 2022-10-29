import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  // Image,
  // FormControl,
  // Select,
  // FormLabel,
  // Input,
  Flex,
  Stack,
  // SimpleGrid,
  Text,
  Button,
  // IconButton,
  Center,
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlinePartition } from "react-icons/ai";
import { deleteUser, detailsUser, listUsers } from "Actions/userActions";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { createScreen, listScreens } from "Actions/screenActions";
import { USER_DELETE_RESET } from "Constants/userConstants";
import { SCREEN_CREATE_RESET } from "Constants/screenConstants";
export function CustomCreate() {
  const navigate = useNavigate();

  const [usersVisible, setUsersVisible] = React.useState(true);
  const [screensVisible, setScreensVisible] = React.useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const screenList = useSelector((state: any) => state.screenList);
  const {
    loading: loadingScreenList,
    error: errorScreenList,
    screens,
  } = screenList;

  const userDelete = useSelector((state: any) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success } = userDelete;

  const screenCreate = useSelector((state: any) => state.screenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    screen: createdScreen,
  } = screenCreate;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (success) {
      dispatch({
        type: USER_DELETE_RESET,
      });
    }
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      navigate(`/edit/screen/${createdScreen._id}`);
    }
    dispatch(
      detailsUser({
        userId: userInfo?._id,
        walletAddress: userInfo.defaultWallet,
      })
    );
    dispatch(listUsers());
    dispatch(listScreens({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    navigate,
    success,
    successCreate,
    userInfo?._id,
    userInfo.defaultWallet,
  ]);

  const deleteUserHandler = (user: any) => {
    if (window.confirm("Are you sure???")) {
      dispatch(deleteUser(user._id));
    }
  };

  const createScreenHandler = () => {
    dispatch(createScreen());
  };

  const usersHandler = () => {
    setScreensVisible(false);
    setUsersVisible(true);
  };

  const screensHandler = () => {
    setUsersVisible(false);
    setScreensVisible(true);
  };
  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        <Center maxW="container.lg" mx="auto" pb="8">
          <Stack p="2">
            <Stack align="center" p="2" direction="row" justify="space-between">
              <AiOutlineArrowLeft onClick={() => navigate(-1)} />
              <Text fontWeight="600">Moderator Access</Text>
              <AiOutlinePartition color="white" />
            </Stack>
            {loadingDetails ||
            loadingUsers ||
            loadingScreenList ||
            loadingCreate ||
            loadingDelete ? (
              <HLoading
                loading={
                  loadingDetails ||
                  loadingUsers ||
                  loadingScreenList ||
                  loadingCreate ||
                  loadingDelete
                }
              />
            ) : errorDetails ||
              errorUsers ||
              errorScreenList ||
              errorCreate ||
              errorDelete ? (
              <MessageBox variant="danger">
                {errorDetails ||
                  errorUsers ||
                  errorScreenList ||
                  errorCreate ||
                  errorDelete}
              </MessageBox>
            ) : (
              <Stack>
                <Flex justify="center">
                  <Button m="1" onClick={usersHandler}>
                    Users
                  </Button>
                  <Button m="1" onClick={screensHandler}>
                    Screens
                  </Button>
                </Flex>
                {usersVisible && (
                  <TableContainer display="block" overflowX="auto">
                    <Table p="2" variant="simple" colorScheme="teal">
                      <TableCaption>Users</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>ID</Th>
                          <Th>NAME</Th>
                          <Th>EMAIL</Th>
                          <Th>IS MASTER</Th>
                          <Th>IS ALLY</Th>
                          <Th>IS Brand</Th>
                          <Th>ACTIONS</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {users.map((user: any) => (
                          <Tr key={user._id}>
                            <Td>{user._id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.isMaster ? "YES" : "NO"}</Td>
                            <Td>{user.isAlly ? "YES" : "NO"}</Td>
                            <Td>{user.isBrand ? "YES" : "NO"}</Td>
                            <Td>
                              <Button
                                type="button"
                                onClick={() => deleteUserHandler(user)}
                              >
                                Delete
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
                <hr />
                {screensVisible && (
                  <TableContainer p="2" display="block" overflowX="auto">
                    <Table p="2" variant="simple" colorScheme="teal">
                      <TableCaption>
                        <Flex justify="center">
                          Screens
                          <Button onClick={createScreenHandler}>Create</Button>
                        </Flex>
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th>ID</Th>
                          <Th>NAME</Th>
                          <Th>Master Name</Th>
                          <Th>IS MASTER</Th>
                          <Th>ACTIONS</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {screens.map((screen: any) => (
                          <Tr key={screen._id}>
                            <Td>{screen._id}</Td>
                            <Td>{screen.name}</Td>
                            <Td>{screen.masterName}</Td>
                            <Td>{screen.master.name ? "YES" : "NO"}</Td>
                            <Td>
                              <Button
                                onClick={() =>
                                  navigate(`/edit/screen/${screen._id}`)
                                }
                              >
                                Edit
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
              </Stack>
            )}
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
