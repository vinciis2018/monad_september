import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Stack,
  IconButton,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  AiOutlineArrowLeft,
  AiOutlineEdit,
  AiOutlineLike,
  AiOutlineFlag,
  AiOutlineSchedule,
  AiOutlineTeam,
  AiOutlineDelete,
  AiOutlineFieldTime,
  AiOutlineEye,
  AiFillMobile,
  AiFillEye,
  AiTwotoneInfoCircle,
} from "react-icons/ai";

import { SCREEN_DELETE_RESET } from "../../Constants/screenConstants";

import {
  detailsScreen,
  getScreenParams,
  screenVideosList,
  deleteScreen,
} from "../../Actions/screenActions";
import { getScreenCalender } from "../../Actions/calendarActions";
import { listAllPleas } from "../../Actions/pleaActions";
// import { getScreenGameDetails } from "../../Actions/gameActions";

import { useMedia } from "hooks";
import { MediaContainer } from "components/common";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

export function ScreenDashboard(props: any) {
  const screenId = window.location.href.split("/").slice()[5];
  // const txId = props.match.params.txId;
  const navigate = useNavigate();

  const [dashboardModalOpen, setDashboardModalOpen] =
    React.useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  const screenVideos = useSelector((state: any) => state.screenVideos);
  const {
    videos,
    loading: loadingScreenVideos,
    error: errorScreenVideos,
  } = screenVideos;

  // const screenGameDetails = useSelector(
  //   (state: any) => state.screenGameDetails
  // );
  // const {
  //   loading: loadingScreenGameDetails,
  //   error: errorScreenGameDetails,
  //   screenGameData,
  // } = screenGameDetails;

  // const screenParams = useSelector((state: any) => state.screenParams);
  // const {
  //   loading: loadingScreenParams,
  //   error: errorScreenParams,
  //   params,
  // } = screenParams;

  const allPleasList = useSelector((state: any) => state.allPleasList);
  const {
    allPleas,
    loading: loadingAllPleas,
    error: errorAllPleas,
  } = allPleasList;

  const screenDelete = useSelector((state: any) => state.screenDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = screenDelete;

  const [txId, setTxId] = React.useState<any>("");
  const { data: media, isLoading, isError } = useMedia({ id: txId });
  // const {data: nftData } = useNftData({id: txId});
  // console.log("nft", { nft });

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (!screen) {
      dispatch(detailsScreen(screenId));
    } else {
      setTxId(screen?.image?.split("/").slice(-1)[0]);
    }

    if (successDelete) {
      dispatch({ type: SCREEN_DELETE_RESET });
      navigate(`/screens`);
    }

    dispatch(screenVideosList(screenId));
    dispatch(getScreenCalender(screenId));
    // dispatch(getScreenGameDetails(screenId));
    dispatch(getScreenParams({ screenId }));
    dispatch(listAllPleas());
  }, [dispatch, screen, txId, successDelete, media, screenId, navigate]);

  const deleteScreenHandler = (screen: any) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteScreen(screen._id));
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {loadingUser ? (
        <HLoading loading={loadingUser} />
      ) : errorUser ? (
        <MessageBox variant="danger">{errorUser}</MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          {loadingScreen ? (
            <HLoading loading={loadingScreen} />
          ) : errorScreen ? (
            <MessageBox variant="danger">{errorScreen}</MessageBox>
          ) : (
            <Stack p="2">
              <Stack
                align="center"
                p="2"
                direction="row"
                justify="space-between"
              >
                <AiOutlineArrowLeft onClick={() => navigate(-1)} />
                <Text fontWeight="600">Screen Dashboard</Text>
                <IconButton
                  bg="none"
                  icon={<AiOutlineEdit size="20px" color="black" />}
                  aria-label="Edit Screen Details"
                ></IconButton>
              </Stack>
              {loadingDelete && <HLoading loading={loadingDelete} />}
              {errorDelete && (
                <MessageBox variant="danger">{errorDelete}</MessageBox>
              )}
              <Box p="2" shadow="card" rounded="lg">
                <Flex p="2" justify="space-between" align="center">
                  <Box>
                    <Text
                      px="2"
                      fontWeight="600"
                      fontSize="sm"
                      color="gray.500"
                    >
                      {screen?.name}
                    </Text>
                    <Text
                      px="2"
                      pb="4"
                      fontWeight=""
                      fontSize="xs"
                      color="gray.500"
                    >
                      Screen ID: {screen._id}
                    </Text>
                    {/* <Text p="2" fontWeight="" fontSize="xs">₹ {walletPrice?.totalPrice?.toFixed(3)}</Text> */}
                    <Text
                      px="2"
                      pb="4"
                      fontWeight=""
                      fontSize="xs"
                      color="gray.500"
                    >
                      Master Name: {userInfo.name}
                    </Text>
                  </Box>
                  <AiOutlineDelete
                    aria-label="hidden"
                    onClick={() => deleteScreenHandler(screen)}
                  />
                </Flex>
                <SimpleGrid gap="4" columns={[3]} p="2">
                  <Box
                    onClick={() =>
                      navigate(
                        `/screen/${screen._id}/${
                          screen?.image.split("/").slice(-1)[0]
                        }/${screen?.activeGameContract}`
                      )
                    }
                    bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)"
                    align="center"
                    shadow="card"
                    rounded="lg"
                    p="2"
                  >
                    <Text fontWeight="" fontSize="xs">
                      Playlist
                    </Text>
                    <Text p="2" fontWeight="600" fontSize="lg">
                      {screen?.videos?.length}
                    </Text>
                  </Box>
                  <Box
                    onClick={() => navigate(`/pleaBucket`)}
                    bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)"
                    align="center"
                    shadow="card"
                    rounded="lg"
                    p="2"
                  >
                    <Text fontWeight="" fontSize="xs">
                      Allies
                    </Text>
                    <Text p="2" fontWeight="600" fontSize="lg">
                      {screen?.allies?.length}
                    </Text>
                  </Box>
                  <Box
                    onClick={() => navigate(`/pleaBucket`)}
                    bgGradient="linear-gradient(to bottom, #BC78EC20, #7833B660)"
                    align="center"
                    shadow="card"
                    rounded="lg"
                    p="2"
                  >
                    <Text fontWeight="" fontSize="xs">
                      Pleas
                    </Text>
                    {loadingAllPleas ? (
                      <HLoading loading={loadingAllPleas} />
                    ) : errorAllPleas ? (
                      <MessageBox variant="danger">{errorAllPleas}</MessageBox>
                    ) : (
                      <Text p="2" fontWeight="600" fontSize="lg">
                        {
                          allPleas.filter(
                            (plea: any) => plea.screen === screen._id
                          ).length
                        }
                      </Text>
                    )}
                  </Box>
                </SimpleGrid>
              </Box>
              <Box p="2" shadow="card" rounded="lg">
                <SimpleGrid
                  p="4"
                  bgGradient="linear-gradient(to bottom, #)"
                  gap="4"
                  columns={[2]}
                >
                  <Button
                    onClick={() => setDashboardModalOpen(false)}
                    rounded="full"
                    bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                    fontSize="xs"
                    size="sm"
                  >
                    Campaigns
                  </Button>
                  <Button
                    onClick={() => setDashboardModalOpen(!dashboardModalOpen)}
                    rounded="full"
                    color="violet.500"
                    variant="outline"
                    fontSize="xs"
                    size="sm"
                  >
                    Dashboard
                  </Button>
                </SimpleGrid>

                {dashboardModalOpen ? (
                  <Stack>
                    {isLoading ? (
                      <HLoading loading={isLoading} />
                    ) : isError ? (
                      <MessageBox variant="danger">{isError}</MessageBox>
                    ) : (
                      <Box p="2" shadow="card" rounded="lg">
                        <MediaContainer media={media} />
                        <Flex p="2" align="center" justify="space-between">
                          <Box align="center">
                            <Text fontSize="xs">{screen?.likedBy?.length}</Text>
                            <AiOutlineLike />
                            <Text fontSize="xs">Likes</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">
                              {screen?.flaggedBy?.length}
                            </Text>
                            <AiOutlineFlag />
                            <Text fontSize="xs">Flags</Text>
                          </Box>
                          <Box align="center">
                            <Text fontSize="xs">
                              {screen?.subscribers?.length}
                            </Text>
                            <AiOutlineSchedule />
                            <Text fontSize="xs">Subscribers</Text>
                          </Box>
                          <Box align="center">
                            {/* <Text fontSize="xs">{nft?.attention}</Text> */}
                            <AiOutlineEye />
                            <Text fontSize="xs">Views</Text>
                          </Box>
                        </Flex>
                      </Box>
                    )}
                    <Flex
                      p="4"
                      shadow="card"
                      rounded="lg"
                      align="center"
                      justify="space-between"
                    >
                      <Text fontSize="xs">Total Earnings</Text>
                      <Text fontWeight="600" fontSize="xs">
                        ₹ 345
                      </Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <AiOutlineTeam size="20px" />
                        <Text p="1" fontSize="xs">
                          Footfall
                        </Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <AiFillEye size="20px" />
                        <Text p="1" fontSize="xs">
                          Views
                        </Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                    <Flex p="2" align="center" justify="space-between">
                      <Flex align="center" justify="left">
                        <AiFillMobile size="20px" />
                        <Text p="1" fontSize="xs">
                          Interaction
                        </Text>
                      </Flex>
                      <Text fontSize="xs">10000 per day</Text>
                    </Flex>
                  </Stack>
                ) : (
                  <>
                    {loadingScreenVideos ? (
                      <HLoading loading={loadingScreenVideos} />
                    ) : errorScreenVideos ? (
                      <MessageBox variant="danger">
                        {errorScreenVideos}
                      </MessageBox>
                    ) : (
                      <Stack>
                        {videos.map((video: any) => (
                          <Box
                            bgColor=""
                            key={video._id}
                            p="2"
                            rounded="lg"
                            shadow="card"
                            align="center"
                            justify="center"
                          >
                            <Flex justify="space-between" align="center">
                              <Text fontWeight="600" fontSize="sm">
                                {video?.title}
                              </Text>
                              <Flex justify="right" align="center">
                                <AiTwotoneInfoCircle
                                  color="green"
                                  size="10px"
                                />
                                <Text
                                  p="1"
                                  fontSize="xs"
                                  fontWeight="600"
                                  color="green.500"
                                >
                                  online
                                </Text>
                              </Flex>
                            </Flex>
                            <Flex pt="2" justify="space-between" align="center">
                              <Text fontSize="xs">Screen Id:</Text>
                              <Text
                                fontSize="xs"
                                fontWeight="600"
                                color="violet.500"
                              >
                                {video?.screen}
                              </Text>
                            </Flex>
                            <Flex pb="2" justify="space-between" align="center">
                              <Text fontSize="xs">
                                {video?.slotsAvailable} 2145 times played
                              </Text>
                              <Text fontSize="xs">
                                {new Date().toDateString()}
                              </Text>
                            </Flex>
                            <hr />
                            <Flex p="2" align="center" justify="space-between">
                              <Flex align="center" justify="left">
                                <AiOutlineFieldTime size="20px" />
                                <Text p="1" fontSize="xs">
                                  Frequency
                                </Text>
                              </Flex>
                              <Text fontSize="xs">10000 per day</Text>
                            </Flex>
                            <Flex p="2" align="center" justify="space-between">
                              <Flex align="center" justify="left">
                                <AiFillEye size="20px" />
                                <Text p="1" fontSize="xs">
                                  Views
                                </Text>
                              </Flex>
                              <Text fontSize="xs">10000 per day</Text>
                            </Flex>
                            <Flex p="2" align="center" justify="space-between">
                              <Flex align="center" justify="left">
                                <AiFillMobile size="20px" />
                                <Text p="1" fontSize="xs">
                                  Interaction
                                </Text>
                              </Flex>
                              <Text fontSize="xs">10000 per day</Text>
                            </Flex>
                            <hr />
                            <SimpleGrid p="2" gap="4" columns={[2]}>
                              <Button
                                color="violet.500"
                                variant="outline"
                                fontSize="xs"
                                size="sm"
                              >
                                Change Status
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(
                                    `/dashboard/campaign/${video._id}/${
                                      video?.video.split("/").slice(-1)[0]
                                    }`
                                  )
                                }
                                bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                                fontSize="xs"
                                size="sm"
                              >
                                View
                              </Button>
                            </SimpleGrid>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </>
                )}
              </Box>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
