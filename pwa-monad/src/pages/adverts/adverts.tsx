import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Box,
  SimpleGrid,
  Flex,
  Stack,
  Input,
  IconButton,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import {
  AiOutlineArrowLeft,
  AiOutlineSliders,
  AiOutlineEdit,
} from "react-icons/ai";
import { listAllVideos } from "../../Actions/advertActions";
import { userVideosList } from "../../Actions/userActions";

import { Advert } from "components/common";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

export function Adverts(props: any) {
  const MotionFlex = motion(Flex);
  const navigate = useNavigate();
  const [myVideosVisible, setMyVideosVisible] = React.useState<boolean>(false);
  const [allVideosVisible, setAllVideosVisible] = React.useState<boolean>(true);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const {
    loading: loadingVideoList,
    error: errorVideoList,
    allVideos,
  } = videoListAll;

  const userVideos = useSelector((state: any) => state.userVideos);
  const {
    loading: loadingMyVideos,
    error: errorMyVideos,
    videos: myVideos,
  } = userVideos;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo) {
      dispatch(userVideosList(userInfo));
    } else {
      navigate(redirect);
    }
    dispatch(listAllVideos());
  }, [dispatch, navigate, redirect, userInfo]);

  const openAllModal = () => {
    setMyVideosVisible(false);
    setAllVideosVisible(true);
  };

  const openMyModal = () => {
    setAllVideosVisible(false);
    setMyVideosVisible(true);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {loadingUser || loadingVideoList || loadingMyVideos ? (
        <HLoading
          loading={loadingUser || loadingVideoList || loadingMyVideos}
        />
      ) : errorUser || errorVideoList || errorMyVideos ? (
        <MessageBox variant="danger">
          {errorUser || errorVideoList || errorMyVideos}
        </MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          <Stack align="center" p="2" direction="row" justify="space-between">
            <AiOutlineArrowLeft onClick={() => navigate(-1)} />
            <Input
              rounded="2xl"
              variant="outline"
              placeholder="Search by Screen Location, Name"
              fontWeight="600"
            />
            <AiOutlineSliders color="violet.500" />
          </Stack>
          <Flex p="2" justify="space-between" align="center">
            <ButtonGroup
              rounded="2xl"
              size="sm"
              isAttached
              spacing="0"
              borderColor="violet.500"
              variant="outline"
            >
              <Button
                rounded="2xl"
                fontSize="xs"
                color={
                  !allVideosVisible && myVideosVisible ? "violet.500" : "white"
                }
                borderColor="violet.500"
                variant={
                  !allVideosVisible && myVideosVisible ? "outline" : "solid"
                }
                bgGradient={
                  !allVideosVisible && myVideosVisible
                    ? "null"
                    : "linear-gradient(to left, #BC78EC, #7833B6)"
                }
                onClick={openAllModal}
              >
                All Ads
              </Button>
              <Button
                rounded="2xl"
                fontSize="xs"
                variant={
                  allVideosVisible && !myVideosVisible ? "outline" : "solid"
                }
                borderColor="violet.500"
                color={
                  allVideosVisible && !myVideosVisible ? "violet.500" : "white"
                }
                bgGradient={
                  allVideosVisible && !myVideosVisible
                    ? "null"
                    : "linear-gradient(to left, #BC78EC, #7833B6)"
                }
                onClick={openMyModal}
              >
                My Ads
              </Button>
            </ButtonGroup>
            {userInfo && userInfo.isMaster && (
              <IconButton
                as={RouterLink}
                to={`/mapbox`}
                bg="none"
                icon={<AiOutlineEdit size="20px" color="black" />}
                aria-label="Edit Advert Details"
              ></IconButton>
            )}
          </Flex>
          <hr />
          {allVideosVisible && (
            <Stack p="1">
              <SimpleGrid p="1" gap="4" columns={[2]}>
                {allVideos?.length === 0 && (
                  <MessageBox>No Screen Found</MessageBox>
                )}
                {allVideos?.map((video: any, index: any) => (
                  <MotionFlex
                    flexDir="column"
                    w="100%"
                    role="group"
                    rounded="md"
                    shadow="card"
                    whileHover={{
                      translateY: -3,
                    }}
                    pos="relative"
                    zIndex="1"
                    key={index}
                  >
                    <Advert key={video._id} video={video} />
                  </MotionFlex>
                ))}
              </SimpleGrid>
            </Stack>
          )}
          {myVideosVisible && (
            <Stack p="1">
              <SimpleGrid p="1" gap="4" columns={[2]}>
                {myVideos?.length === 0 ? (
                  <MessageBox>No Screen Found</MessageBox>
                ) : (
                  <>
                    {myVideos?.map((video: any, index: any) => (
                      <MotionFlex
                        flexDir="column"
                        w="100%"
                        role="group"
                        rounded="md"
                        shadow="card"
                        whileHover={{
                          translateY: -3,
                        }}
                        pos="relative"
                        zIndex="1"
                        key={index}
                      >
                        <Advert key={video._id} video={video} />
                      </MotionFlex>
                    ))}
                  </>
                )}
              </SimpleGrid>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
