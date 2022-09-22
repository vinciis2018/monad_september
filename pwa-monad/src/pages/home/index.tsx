import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import {
  Box,
  Image,
  Text,
  Stack,
  Center,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { listScreens } from "../../Actions/screenActions";
import { listAllVideos } from "../../Actions/advertActions";
import { triggerPort } from "services/utils";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineAim,
  AiOutlineArrowRight,
  AiOutlinePicture,
  AiOutlineArrowLeft,
} from "react-icons/ai";

// import { TopNftsContent } from "components/widgets";
// import { TimeFilter } from "components/filters";

import { Advert, Screen } from "components/common";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function Home(props: any) {
  const navigate = useNavigate();
  const MotionFlex = motion(Flex);

  const [screensModal, setScreensModal] = React.useState(false);
  const [nftsModal, setNftModal] = React.useState(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  const {
    loading: loadingVideos,
    error: errorVideos,
    allVideos,
  } = videoListAll;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    }

    dispatch(listScreens({}));
    dispatch(listAllVideos());

    // dispatch(listTopMasters());
    // dispatch(getAllPins());
  }, [dispatch, navigate, userInfo]);

  const modalHandler = () => {
    setNftModal(false);
    setScreensModal(false);
  };

  const screensModalHandler = () => {
    setScreensModal(true);
    setNftModal(false);
  };

  const nftsModalHandler = () => {
    setScreensModal(false);
    setNftModal(true);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack p="1" color="">
          {loadingScreens || loadingVideos ? (
            <HLoading loading={loadingScreens || loadingVideos} />
          ) : errorScreens || errorVideos ? (
            <MessageBox variant="danger">
              {errorScreens || errorVideos}
            </MessageBox>
          ) : (
            <Center width="100%">
              {screens?.length === 0 && (
                <MessageBox>No Screen Found</MessageBox>
              )}
              <Carousel showArrows autoPlay showThumbs={false}>
                {screens?.map((screen: any) => (
                  <Box
                    key={screen?._id}
                    as={RouterLink}
                    to={`/screen/${screen?._id}/${
                      screen?.image.split("/").slice(-1)[0]
                    }/${screen?.activeGameContract}`}
                    d="flex"
                    flexDir="column"
                    rounded="lg"
                    bg=""
                    shadow="card"
                    flexBasis="100%"
                  >
                    <Image
                      height="300px"
                      width="100%"
                      // shadow="card"
                      rounded="xl"
                      src={screen?.image}
                      onLoad={() =>
                        triggerPort(screen?.image.split("/").slice(-1)[0])
                      }
                    />
                    <Text fontSize="" className="legend">
                      {screen?.name}
                    </Text>
                  </Box>
                ))}
              </Carousel>
            </Center>
          )}
          <SimpleGrid pt="5" gap="2" columns={[2]}>
            <Box
              onClick={() => navigate(`/screens`)}
              py="10"
              rounded="lg"
              shadow="card"
              bgColor="green.100"
              align="center"
            >
              <AiOutlineFundProjectionScreen fontSize="50px" color="gray" />
              <Text p="2" fontSize="2xl" color="gray" fontWeight="600">
                Ad Screens
              </Text>
            </Box>
            <Box
              onClick={() => navigate(`/adverts`)}
              bgColor="teal.100"
              py="10"
              rounded="lg"
              shadow="card"
              align="center"
            >
              <AiOutlinePicture fontSize="50px" color="gray" />
              <Text p="2" fontSize="2xl" color="gray" fontWeight="600">
                Ad Campaigns
              </Text>
            </Box>
          </SimpleGrid>
          <Box p="" as={RouterLink} to={`/mapbox`}>
            <Flex
              px="10"
              py="10"
              rounded="lg"
              shadow="card"
              bgColor="violet.100"
              align="center"
              justify="center"
            >
              <AiOutlineAim fontSize="50px" color="gray" />
              <Text p="2" fontSize="40px" color="gray" fontWeight="600">
                Ad Explorer
              </Text>
            </Flex>
          </Box>
          {userInfo && (
            <Flex p="2" justify="space-between">
              <AiOutlineArrowLeft
                onClick={!screensModal ? screensModalHandler : nftsModalHandler}
                fontSize="20px"
              />
              <Text
                onClick={() =>
                  navigate(
                    `/userProfile/${userInfo._id}/${userInfo?.defaultWallet}`
                  )
                }
                align="center"
                fontSize="md"
                fontWeight="600"
              >
                Or you can simply upload an NFT here...
              </Text>
              <AiOutlineArrowRight
                onClick={!nftsModal ? nftsModalHandler : screensModalHandler}
                fontSize="20px"
              />
            </Flex>
          )}
          <hr />
          <Stack>
            <Flex align="center" justify="space-between">
              <Box
                m="1"
                color={screensModal ? "gray.700" : ""}
                bgColor={screensModal ? "gray.200" : "gray.100"}
                onClick={screensModalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Screens
                </Text>
              </Box>
              <Box
                m="1"
                color={!screensModal && !nftsModal ? "gray.700" : ""}
                bgColor={!screensModal && !nftsModal ? "gray.200" : "gray.100"}
                onClick={modalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Campaigns
                </Text>
              </Box>
              <Box
                m="1"
                color={nftsModal ? "gray.700" : ""}
                bgColor={nftsModal ? "gray.200" : "gray.100"}
                onClick={nftsModalHandler}
                width="100%"
              >
                <Text fontSize="xs" p="2" align="center" fontWeight="600">
                  Wall
                </Text>
              </Box>
            </Flex>
            {screensModal ? (
              <SimpleGrid gap="4" columns={[1, 2]} px="1">
                {screens?.map((screen: any) => (
                  <MotionFlex
                    key={screen._id}
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
                  >
                    <Screen screen={screen} />
                  </MotionFlex>
                ))}
              </SimpleGrid>
            ) : nftsModal ? (
              <Stack>
                {/* <TimeFilter /> */}
                <Text>Coming Soon...</Text>
                <hr />
                {/* <TopNftsContent /> */}
              </Stack>
            ) : (
              <Stack>
                <SimpleGrid gap="4" columns={[1, 2]} px="1">
                  {allVideos?.map((video: any) => (
                    <MotionFlex
                      key={video._id}
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
                    >
                      <Advert key={video._id} video={video} />
                    </MotionFlex>
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
