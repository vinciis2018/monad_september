import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";

import { listAllPleas } from "../../Actions/pleaActions";
import { listUsers } from "../../Actions/userActions";
import {
  rejectScreenAllyPlea,
  grantScreenAllyPlea,
} from "../../Actions/screenActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function PleaBucket(props: any) {
  const navigate = useNavigate();
  const allPleasList = useSelector((state: any) => state.allPleasList);
  const {
    allPleas,
    loading: loadingAllPleas,
    error: errorAllPleas,
  } = allPleasList;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userList = useSelector((state: any) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const screenAllyPleaGrant = useSelector(
    (state: any) => state.screenAllyPleaGrant
  );
  const {
    loading: loadingScreenAllyPleaGrant,
    error: errorScreenAllyPleaGrant,
    success: successScreenAllyPleaGrant,
  } = screenAllyPleaGrant;

  const screenAllyPleaReject = useSelector(
    (state: any) => state.screenAllyPleaReject
  );
  const {
    loading: loadingScreenAllyPleaReject,
    error: errorScreenAllyPleaReject,
    success: successScreenAllyPleaReject,
  } = screenAllyPleaReject;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (successScreenAllyPleaGrant) {
      window.alert("Ally access Granted");
    }
    if (successScreenAllyPleaReject) {
      window.alert("Ally access Rejected");
    }

    if (!userInfo) {
      navigate(redirect);
    }

    dispatch(listAllPleas());
    dispatch(listUsers());
  }, [
    dispatch,
    userInfo,
    successScreenAllyPleaGrant,
    successScreenAllyPleaReject,
    navigate,
    redirect,
  ]);

  const allyAccessHandler = (pleaId: any) => {
    window.confirm("Are you sure?");
    dispatch(grantScreenAllyPlea(pleaId));
  };

  const allyRemoveHandler = (pleaId: any) => {
    window.confirm("Are you sure?");
    dispatch(rejectScreenAllyPlea(pleaId));
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack align="center" p="2" direction="row" justify="space-between">
          <AiOutlineArrowLeft onClick={() => navigate(-1)} />
          <Text fontWeight="600">Notifications</Text>
          <AiOutlineCloseCircle
            size="20px"
            color="black"
            onClick={() => navigate(`/screens`)}
          />
        </Stack>
        {loadingScreenAllyPleaGrant && (
          <HLoading loading={loadingScreenAllyPleaGrant} />
        )}
        {errorScreenAllyPleaGrant && (
          <MessageBox variant="danger">{errorScreenAllyPleaGrant}</MessageBox>
        )}
        {loadingScreenAllyPleaReject && (
          <HLoading loading={loadingScreenAllyPleaReject} />
        )}
        {errorScreenAllyPleaReject && (
          <MessageBox variant="danger">{errorScreenAllyPleaReject}</MessageBox>
        )}

        {loadingAllPleas ? (
          <HLoading loading={loadingAllPleas} />
        ) : errorAllPleas ? (
          <MessageBox variant="danger">{errorAllPleas}</MessageBox>
        ) : (
          <Stack p="2">
            {userInfo && (
              <Box p="2">
                <Text p="2" fontWeight="600" fontSize="">
                  Pleas I made
                </Text>
                <hr />
                {allPleas
                  .filter((myPlea: any) => myPlea.from === userInfo._id)
                  .map((plea: any) => (
                    <Box
                      shadow="card"
                      p="2"
                      justify="space-between"
                      key={plea._id}
                      rounded="lg"
                    >
                      {loadingUsers ? (
                        <HLoading loading={loadingUsers} />
                      ) : errorUsers ? (
                        <MessageBox variant="danger">{errorUsers}</MessageBox>
                      ) : (
                        <Flex p="2" justify="space-between" align="center">
                          {users
                            .filter(
                              (user: any) => user.defaultWallet === plea.to
                            )
                            .map((user: any) => (
                              <Text
                                key={user._id}
                                fontWeight="600"
                                onClick={() =>
                                  navigate(`/userProfile/${user.defaultWallet}`)
                                }
                                fontSize=""
                              >
                                To: {user.name}
                              </Text>
                            ))}
                          {plea.reject && (
                            <Text fontSize="sm" color="red">
                              Access Revoked
                            </Text>
                          )}
                        </Flex>
                      )}
                      <hr />
                      <Text px="1" fontSize="sm">
                        {plea.content}
                      </Text>
                      <Text px="1" fontSize="sm">
                        Type: {plea.pleaType}
                      </Text>
                      <Text px="1" fontSize="sm">
                        Screen: {plea.screen}{" "}
                      </Text>
                      <Stack p="2" color={plea.status ? "green" : "red"}>
                        Status:{" "}
                        {plea.status ? (
                          <Text fontWeight="600" fontSize="xs">
                            Granted
                          </Text>
                        ) : (
                          <Text fontWeight="600" fontSize="xs">
                            In Process
                          </Text>
                        )}
                      </Stack>
                    </Box>
                  ))}
              </Box>
            )}
            {userInfo.isMaster && (
              <Box p="2">
                <Text p="2" fontWeight="600" fontSize="">
                  Pleas I recieved
                </Text>
                <hr />
                {allPleas
                  .filter((myPlea: any) => myPlea.to === userInfo._id)
                  .map((plea: any) => (
                    <Box
                      key={plea._id}
                      shadow="card"
                      p="2"
                      justify="space-between"
                    >
                      {loadingUsers ? (
                        <HLoading loading={loadingUsers} />
                      ) : errorUsers ? (
                        <MessageBox variant="danger">{errorUsers}</MessageBox>
                      ) : (
                        <Flex p="2" justify="space-between" align="center">
                          {users
                            .filter(
                              (user: any) => user.defaultWallet === plea.from
                            )
                            .map((user: any) => (
                              <Text
                                key={user._id}
                                fontWeight="600"
                                onClick={() =>
                                  navigate(`/userProfile/${user.defaultWallet}`)
                                }
                                fontSize=""
                              >
                                From: {user.name}
                              </Text>
                            ))}
                          {!plea.status && (
                            <Button
                              bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                              width="30%"
                              fontSize="xs"
                              onClick={() => allyAccessHandler(plea._id)}
                            >
                              Give Access
                            </Button>
                          )}
                          {plea.status && (
                            <Button
                              variant="outline"
                              color="violet.500"
                              width="30%"
                              fontSize="xs"
                              onClick={() => allyRemoveHandler(plea._id)}
                            >
                              Revoke Access
                            </Button>
                          )}
                        </Flex>
                      )}
                      <hr />
                      <Text px="1" fontSize="sm">
                        {plea.content}
                      </Text>
                      <Text px="1" fontSize="sm">
                        Type: {plea.pleaType}
                      </Text>
                      <Text px="1" fontSize="sm">
                        Screen: {plea.screen}{" "}
                      </Text>
                      <Stack p="2" color={plea.status ? "green" : "red"}>
                        Status:{" "}
                        {plea.status ? (
                          <Text fontWeight="600" fontSize="xs">
                            Granted
                          </Text>
                        ) : (
                          <Text fontWeight="600" fontSize="xs">
                            In Process
                          </Text>
                        )}
                      </Stack>
                    </Box>
                  ))}
              </Box>
            )}
            {!userInfo && <Text fontSize="">PleaseSignin</Text>}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
