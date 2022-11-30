import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  // DateTimePicker,
  TimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  IconButton as MiuiIconButton,
  InputAdornment,
} from "@material-ui/core";

import {
  Box,
  Wrap,
  WrapItem,
  Badge,
  Slider,
  SliderTrack,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  Select,
  FormLabel,
  Input,
  Center,
  Flex,
  Stack,
  SimpleGrid,
  Image,
  Text,
  Button,
  IconButton,
  // ButtonGroup,
} from "@chakra-ui/react";

import {
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineFire,
  AiOutlineStop,
  AiOutlineEdit,
  AiOutlineUpload,
  AiOutlineCalendar,
  // AiOutlineInfoCircle,
  // AiOutlineCloseCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";

import { detailsScreen } from "../../Actions/screenActions";

import { useMedia } from "hooks";
import { useWallet } from "components/contexts";

import { MediaContainer } from "components/common";
import {
  createAdvertGame,
  removeAdvertGame,
  getAdvertGameDetails,
} from "../../Actions/gameActions";
import {
  // addCalenderData,
  getScreenCalender,
  // bookSlot,
  // bookDay,
  // bookDaySlot,
} from "../../Actions/calendarActions";
import { getVideoDetails, updateVideo } from "../../Actions/advertActions";
import { ADVERT_UPDATE_RESET } from "../../Constants/advertConstants";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { getMyMedia } from "Actions/mediaActions";

export function AdvertEdit(props: any) {
  const txId = window.location.href.split("/").slice()[5];
  const videoId = window.location.href.split("/").slice()[4];
  const screenId = window.location.href.split("/").slice()[6];

  const navigate = useNavigate();

  const { data: media, isLoading, isError } = useMedia({ id: txId });

  const { isLoading: isWalletLoading } = useWallet();

  // const {
  //   data: artist,
  //   isLoading: isLoadingArtist,
  //   isError: isErrorArtist,
  // } = useArtist({ id: walletAddress });

  const [title, setTitle] = React.useState<any>("");
  const [description, setDescription] = React.useState<any>("");
  const [thumbnail, setThumbnail] = React.useState<any>("");
  const [advert, setAdvert] = React.useState<any>("");
  const [adWorth, setAdWorth] = React.useState<any>(0);
  const [adBudget, setAdBudget] = React.useState<any>(0);
  const [expectedViews, setExpectedViews] = React.useState<any>(0);
  const [hrsToComplete, setHrsToComplete] = React.useState<any>(0);
  const [advertTags, setAdvertTags] = React.useState<any>([]);
  const [category, setCategory] = React.useState<any>("");
  const [brandName, setBrandName] = React.useState<any>("");

  const [modalVisible, setModalVisible] = React.useState<any>(false);

  const [mediaUploadModal, setMediaUploadModal] = React.useState<any>(false);
  const [selectThumbnailPopup, setSelectThumbnailPopup] =
    React.useState<any>(false);
  const [selectAdvertPopup, setSelectAdvertPopup] = React.useState<any>(false);
  const [selectMediaPopup, setSelectMediaPopup] = React.useState<any>(false);

  const [slotDateHere, setSlotDateHere] = React.useState<any>(new Date());
  const [startTime, setStartTime] = React.useState<any>(new Date());
  const [endTime, setEndTime] = React.useState<any>(new Date());

  const [slotsPerDay, setSlotsPerDay] = React.useState<any>(1);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { loading: loadingUser, error: errorUser, userInfo } = userSignin;

  const videoDetails = useSelector((state: any) => state.videoDetails);
  const { loading: loadingVideo, error: errorVideo, video } = videoDetails;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const slotBooking = useSelector((state: any) => state.slotBooking);
  const {
    loading: loadingSlotBooking,
    error: errorSlotBooking,
    success: successSlotBooking,
    bookedSlot,
  } = slotBooking;

  const screenCalender = useSelector((state: any) => state.screenCalender);
  const {
    loading: loadingScreenCalender,
    error: errorScreenCalender,
    calender,
  } = screenCalender;

  const calenderDataAdd = useSelector((state: any) => state.calenderDataAdd);
  const {
    loading: loadingCalenderDataAdd,
    error: errorCalenderDataAdd,
    success: successCalenderDataAdd,
    calenderSlotData,
  } = calenderDataAdd;

  const calenderDaySlotBook = useSelector(
    (state: any) => state.calenderDaySlotBook
  );
  const {
    loading: loadingDaySlotBook,
    error: errorDaySlotBook,
    success: successDaySlotBook,
    calenderDaySlotData,
  } = calenderDaySlotBook;

  const dayBooking = useSelector((state: any) => state.dayBooking);
  const {
    loading: loadingDayBooking,
    error: errorDayBooking,
    success: successDayBooking,
    bookedDay,
  } = dayBooking;

  const videoUpdate = useSelector((state: any) => state.videoUpdate);
  const {
    loading: loadingVideoUpdate,
    error: errorVideoUpdate,
    success: successVideoUpdate,
  } = videoUpdate;

  const advertGameCreate = useSelector((state: any) => state.advertGameCreate);
  const {
    loading: loadingAdvertGameCreate,
    error: errorAdvertGameCreate,
    success: successAdvertGameCreate,
    createdAdvertGame,
  } = advertGameCreate;

  const advertGameDetails = useSelector(
    (state: any) => state.advertGameDetails
  );
  const {
    loading: loadingAdvertGameDetails,
    error: errorAdvertGameDetails,
    advertGameData,
  } = advertGameDetails;

  const advertGameRemove = useSelector((state: any) => state.advertGameRemove);
  const {
    loading: loadingAdvertGameRemove,
    error: errorAdvertGameRemove,
    success: successAdvertGameRemove,
  } = advertGameRemove;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    // console.log(window.location.href.split("/").slice()[5]);
    if (!video || video._id !== videoId || successVideoUpdate) {
      dispatch({
        type: ADVERT_UPDATE_RESET,
      });
      dispatch(getVideoDetails(videoId));
    } else {
      setTitle(video.title);
      setThumbnail(thumbnail || video.thumbnail);
      setAdvert(advert || video.video);
      setDescription(video.description);
      setAdWorth(video.adWorth);
      setAdBudget(video.adBudget);
      setHrsToComplete(video.hrsToComplete);
      setExpectedViews(video.expectedViews);
      setAdvertTags(video.videoTags);
      setCategory(video.category);
    }

    if (successSlotBooking) {
      window.alert("slot booked successfully");
      dispatch(getScreenCalender(screenId));
    }
    if (successDayBooking) {
      window.alert("day booked successfully");
      dispatch(getScreenCalender(screenId));
    }
    if (successAdvertGameCreate) {
      window.alert("Advert Game Created Successfully");
    }
    if (successAdvertGameRemove) {
      window.alert("Advert Game Removed Successfully");
    }

    if (!userInfo) {
      navigate(redirect);
    }

    dispatch(getVideoDetails(videoId));
    dispatch(detailsScreen(screenId));
    dispatch(getScreenCalender(screenId));
    dispatch(getAdvertGameDetails(videoId));
    dispatch(getMyMedia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    userInfo,
    videoId,
    screenId,
    successCalenderDataAdd,
    successDaySlotBook,
    successSlotBooking,
    bookedSlot,
    successVideoUpdate,
    createdAdvertGame,
    successAdvertGameCreate,
    successAdvertGameRemove,
    txId,
    successDayBooking,
    navigate,
    redirect,
  ]);

  const videoUpdateHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateVideo({
        _id: videoId,
        advert,
        thumbnail,
        title,
        description,
        adWorth,
        adBudget,
        expectedViews,
        hrsToComplete,
        advertTags,
        category,
        brandName,
        defaultWallet: userInfo.defaultWallet,
      })
    );
    navigate(
      `/advert/${video?._id}/${video?.video?.split("/").slice(-1)[0]}/${
        video?.screen
      }`
    );
  };

  const addGameContract = async (e: any) => {
    let confirm: any;
    e.preventDefault();
    window.alert("Please confirm your request to create screen game.");
    await window.arweaveWallet.getActivePublicKey().then((res) => {
      confirm = res;
      return confirm;
    });
    dispatch(
      createAdvertGame(videoId, {
        _id: videoId,
        name: title,
        description,
        category,
        brandName,
        thumbnail,
        advert,
        adWorth,
        expectedViews,
        hrsToComplete,
        adBudget,
        tags: advertTags,
        confirm,
        gamePage: `${window.location.href.split(`/edit/${video.screen}`)[0]}`,
        gameType: `ADVERT_GAME`,
        walletAddress: userInfo.defaultWallet,
      })
    );
  };

  const removeGameContract = (e: any) => {
    e.preventDefault();
    dispatch(removeAdvertGame(videoId));
  };

  const uploadAdvertMedia = () => {
    setSelectMediaPopup(!selectMediaPopup);
    setSelectThumbnailPopup(false);
    setSelectAdvertPopup(!selectAdvertPopup);
  };

  const uploadThumbnailMedia = () => {
    setSelectMediaPopup(!selectMediaPopup);
    setSelectAdvertPopup(false);
    setSelectThumbnailPopup(!selectThumbnailPopup);
  };

  const chooseAdvert = (e: any) => {
    e.preventDefault();
    setAdvert(e.target.value);
    setSelectMediaPopup(!selectMediaPopup);
    setSelectAdvertPopup(!selectAdvertPopup);
    setSelectThumbnailPopup(false);
  };

  const chooseThumbnail = (e: any) => {
    e.preventDefault();
    setThumbnail(e.target.value);
    setSelectMediaPopup(!selectMediaPopup);
    setSelectThumbnailPopup(!selectThumbnailPopup);
    setSelectAdvertPopup(false);
  };

  const calenderHandler = () => {
    setModalVisible(!modalVisible);
    setMediaUploadModal(false);
  };

  return (
    <Box px="2" py="20" color="black.500">
      <Box maxW="container.lg" mx="auto" pb="8">
        {loadingUser && loadingScreen ? (
          <HLoading loading={loadingUser || loadingScreen} />
        ) : errorUser && errorScreen ? (
          <MessageBox variant="danger">{errorUser || errorScreen}</MessageBox>
        ) : (
          <Box>
            <Stack p="2" direction="row" justify="space-between">
              <AiOutlineArrowLeft onClick={() => navigate(-1)} />
              <Text fontWeight="600">Edit Campaign Details</Text>
              <AiOutlineCheckCircle
                color="green"
                onClick={videoUpdateHandler}
              />
            </Stack>
            {/* <hr /> */}
            {loadingVideoUpdate && <HLoading loading={loadingVideoUpdate} />}
            {errorVideoUpdate && (
              <MessageBox variant="danger">{errorVideoUpdate}</MessageBox>
            )}
            {loadingVideo ? (
              <HLoading loading={loadingVideo} />
            ) : errorVideo ? (
              <MessageBox variant="danger">{errorVideo}</MessageBox>
            ) : (
              <Stack px="2">
                {!modalVisible ? (
                  <Stack>
                    {!mediaUploadModal ? (
                      <Stack p="2">
                        {isLoading && <HLoading loading={isLoading} />}
                        {isError && (
                          <MessageBox variant="danger">{isError}</MessageBox>
                        )}
                        {!isLoading && (
                          <Box>
                            <Text p="1" fontSize="xs" fontWeight="600" color="">
                              Advert for "{video?.title}" Ad Campaign
                            </Text>
                            <MediaContainer media={media} />
                            <Text
                              onClick={() =>
                                setMediaUploadModal(!mediaUploadModal)
                              }
                              p="1"
                              align="center"
                              fontWeight="600"
                              fontSize="sm"
                            >
                              Click here to change the advert
                            </Text>
                          </Box>
                        )}
                        <Box shadow="card" p="2" rounded="lg">
                          <Text
                            align="center"
                            fontWeight="600"
                            p="2"
                            fontSize="md"
                          >
                            Edit your campaign details
                          </Text>
                          <FormControl p="2" id="title">
                            <Stack direction="row" align="center">
                              <Input
                                id="title"
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={title}
                                value={title}
                                type="text"
                              />
                            </Stack>
                            <FormLabel px="1" fontSize="xs">
                              Your campaign will be known by this name...
                            </FormLabel>
                          </FormControl>
                          <FormControl p="2" id="description">
                            <Stack direction="row" align="center">
                              <Input
                                id="description"
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={description}
                                value={description}
                                type="text"
                              />
                            </Stack>
                            <FormLabel px="1" fontSize="xs">
                              This will explain about your campaign...
                            </FormLabel>
                          </FormControl>
                          <FormControl p="2" id="category">
                            <Stack direction="row" align="center">
                              <Select
                                placeholder={category}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option key={1} value="AUTOMOBILE">
                                  Automobile
                                </option>
                                <option key={2} value="COACHING_INSTITUTE">
                                  Coaching/Institute
                                </option>
                                <option key={3} value="CONSUMER_GOOD">
                                  Consumer Good
                                </option>
                                <option key={4} value="CONSUMER_TECH">
                                  Cosumer Tech
                                </option>
                                <option key={5} value="ENTERTAINMENT">
                                  Entertainment
                                </option>
                                <option key={6} value="FOOD_BEVEREGE">
                                  Food/Beverege
                                </option>
                                <option key={7} value="GOVERNMENT">
                                  Government Body
                                </option>
                                <option key={8} value="HEALTH_MEDICINE">
                                  Health/Medicine
                                </option>
                                <option key={9} value="HOSPITAL_LABS">
                                  Hospital/Pharma Lab
                                </option>
                                <option key={10} value="HOTEL_ACCOMODATION">
                                  Hotel/Accomodation
                                </option>
                                <option key={11} value="NEWS_POLITICS">
                                  News/Politics
                                </option>
                                <option key={12} value="SCHOOL_COLLEGE">
                                  School/College
                                </option>
                                <option key={13} value="STARTUP_MSME">
                                  Startup/MSME
                                </option>
                                <option key={14} value="TRAVEL_TOURISM">
                                  Travel/Toursim
                                </option>
                                <option key={15} value="OTHER">
                                  Others
                                </option>
                              </Select>
                            </Stack>
                            <FormLabel px="1" fontSize="xs">
                              Campaign Category
                            </FormLabel>
                          </FormControl>
                          <FormControl p="2" id="brandName">
                            <Stack direction="row" align="center">
                              <Input
                                id="brandName"
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder={brandName}
                                value={brandName}
                                type="text"
                              />
                            </Stack>
                            <FormLabel px="1" fontSize="xs">
                              Mention the name of the brand for this campaign...
                            </FormLabel>
                          </FormControl>
                          <FormControl p="2" id="advertTags">
                            <Stack direction="row" align="center">
                              <Input
                                id="advertTags"
                                onChange={(e) => setAdvertTags(e.target.value)}
                                placeholder="nsfw,art,holiday, ...etc"
                                value={advertTags}
                              />
                            </Stack>
                            <FormLabel px="1" fontSize="xs">
                              These tags will help in increasing your campaign's
                              visibility...
                            </FormLabel>
                            <Wrap spacing="8px" mt="3" mb="3">
                              {Object.keys(advertTags)
                                .map((key) => [String(key), advertTags[key]])
                                .map((t) => (
                                  <WrapItem key={t[1]}>
                                    <Badge
                                      rounded="md"
                                      shadow="card"
                                      py="1"
                                      px="2"
                                      colorScheme="blue"
                                    >
                                      {t[1]}
                                    </Badge>
                                  </WrapItem>
                                ))}
                            </Wrap>
                          </FormControl>
                        </Box>
                        <Box py="2">
                          <Text p="1" fontSize="xs" fontWeight="600" color="">
                            Thumbnail for "{video?.title}" Ad Campaign
                          </Text>
                          <Image
                            px="1px"
                            src={video?.thumbnail}
                            width="100%"
                            height="240px"
                            rounded="md"
                          />
                        </Box>
                        <Box shadow="card" p="2" rounded="lg">
                          {!video.activeGameContract && (
                            <Stack>
                              <Text
                                p="2"
                                textAlign="center"
                                fontSize="md"
                                fontWeight="600"
                              >
                                Edit Game Details
                              </Text>
                              <FormControl p="2" id="adWorth">
                                <Stack direction="row" align="center">
                                  <Input
                                    id="adWorth"
                                    onChange={(e) => setAdWorth(e.target.value)}
                                    placeholder={adWorth}
                                    value={adWorth}
                                    type="number"
                                  />
                                </Stack>
                                <FormLabel px="1" fontSize="xs">
                                  This is the amount of RAT that you want for
                                  the data of this campaign...
                                </FormLabel>
                              </FormControl>
                              <FormControl p="2" id="adBudget">
                                <Stack direction="row" align="center">
                                  <Input
                                    id="adBudget"
                                    onChange={(e) =>
                                      setAdBudget(e.target.value)
                                    }
                                    placeholder={adBudget}
                                    value={adBudget}
                                    type="number"
                                  />
                                </Stack>
                                <FormLabel fontSize="xs">
                                  This is the amount of RAT that you want to
                                  distribute among your campaign's audiences...
                                </FormLabel>
                              </FormControl>
                              <FormControl p="2" id="expectedViews">
                                <Stack direction="row" align="center">
                                  <Input
                                    id="expectedViews"
                                    onChange={(e) =>
                                      setExpectedViews(e.target.value)
                                    }
                                    placeholder={expectedViews}
                                    value={expectedViews}
                                    type="number"
                                  />
                                </Stack>
                                <FormLabel fontSize="xs">
                                  This is the minimum number of interactions
                                  that you want from your audiences...
                                </FormLabel>
                              </FormControl>
                              <FormControl p="2" id="hrsToComplete">
                                <Stack direction="row" align="center">
                                  <Input
                                    id="hrsToComplete"
                                    onChange={(e) =>
                                      setHrsToComplete(e.target.value)
                                    }
                                    placeholder={hrsToComplete}
                                    value={hrsToComplete}
                                    type="number"
                                  />
                                </Stack>
                                <FormLabel fontSize="xs">
                                  This the number of hours you took to create
                                  this campaign...
                                </FormLabel>
                              </FormControl>
                              {loadingAdvertGameCreate ? (
                                <HLoading loading={loadingAdvertGameCreate} />
                              ) : errorAdvertGameCreate ? (
                                <MessageBox variant="danger">
                                  {errorAdvertGameCreate}
                                </MessageBox>
                              ) : (
                                <Flex
                                  p="2"
                                  onClick={addGameContract}
                                  align="center"
                                  justify="flex-end"
                                >
                                  <IconButton
                                    bg="none"
                                    icon={
                                      <AiOutlineFire
                                        size="20px"
                                        color="green"
                                      />
                                    }
                                    aria-label="Edit Advert Details"
                                  ></IconButton>
                                  <Text
                                    fontWeight="600"
                                    color="green.500"
                                    fontSize="xs"
                                  >
                                    Create Game Contract
                                  </Text>
                                  {/* <Button color="violet.500" variant="outline" width="20%" onClick={addGameContract}>Create Game</Button> */}
                                </Flex>
                              )}
                            </Stack>
                          )}
                          {video.activeGameContract && (
                            <Stack>
                              {loadingAdvertGameDetails ? (
                                <HLoading loading={loadingAdvertGameDetails} />
                              ) : errorAdvertGameDetails ? (
                                <MessageBox variant="danger">
                                  {errorAdvertGameDetails}
                                </MessageBox>
                              ) : (
                                <Box>
                                  {advertGameData?.message && (
                                    <MessageBox variant="danger">
                                      {advertGameData.message}
                                    </MessageBox>
                                  )}

                                  <Flex align="center" justify="space-between">
                                    <Box
                                      shadow="card"
                                      border="1px"
                                      borderColor="gray.200"
                                      rounded="md"
                                      p="1"
                                      width="30%"
                                      align="center"
                                    >
                                      <Text fontSize="xs">Initial Worth</Text>
                                      <Text fontWeight="600" fontSize="">
                                        INR{" "}
                                        {
                                          advertGameData?.gameParams
                                            ?.initialWorth
                                        }
                                      </Text>
                                    </Box>
                                    <Box
                                      shadow="card"
                                      border="1px"
                                      borderColor="gray.200"
                                      rounded="md"
                                      p="1"
                                      width="30%"
                                      align="center"
                                    >
                                      <Text fontSize="xs">Initial Budget</Text>
                                      <Text fontWeight="600" fontSize="">
                                        INR{" "}
                                        {
                                          advertGameData?.gameParams
                                            ?.initialBudget
                                        }
                                      </Text>
                                    </Box>
                                    <Box
                                      shadow="card"
                                      border="1px"
                                      borderColor="gray.200"
                                      rounded="md"
                                      p="1"
                                      width="30%"
                                      align="center"
                                    >
                                      <Text fontSize="xs">Expected Views</Text>
                                      <Text fontWeight="600" fontSize="">
                                        {
                                          advertGameData?.gameParams
                                            ?.expectedViews
                                        }
                                      </Text>
                                    </Box>
                                  </Flex>
                                </Box>
                              )}
                              {loadingAdvertGameRemove ? (
                                <HLoading loading={loadingAdvertGameRemove} />
                              ) : errorAdvertGameRemove ? (
                                <MessageBox variant="danger">
                                  {errorAdvertGameRemove}
                                </MessageBox>
                              ) : (
                                <Flex
                                  p="2"
                                  onClick={removeGameContract}
                                  align="center"
                                  justify="flex-end"
                                >
                                  <IconButton
                                    bg="none"
                                    icon={
                                      <AiOutlineStop size="20px" color="red" />
                                    }
                                    aria-label="Edit Advert Details"
                                  ></IconButton>
                                  <Text
                                    onClick={() => navigate("/")}
                                    fontWeight="600"
                                    color="red.500"
                                    fontSize="xs"
                                  >
                                    Remove Active Game Contract
                                  </Text>
                                  {/* <Button width="20%" color="violet.500" variant="outline" onClick={removeGameContract}>Remove Game</Button> */}
                                </Flex>
                              )}
                            </Stack>
                          )}
                          {video.__v < 1 && (
                            <Badge rounded="md" px="2" py="1" fontSize="xs">
                              Change tags and update first
                            </Badge>
                          )}
                        </Box>
                        <Button
                          bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                          width="100%"
                          type="submit"
                          onClick={calenderHandler}
                        >
                          Next, Book Slots
                        </Button>
                      </Stack>
                    ) : (
                      <Stack p="2">
                        {!isWalletLoading && (
                          <Stack>
                            {advert !== null && (
                              <Stack>
                                <Text fontSize="xs" fontWeight="600">
                                  This is the advert media of your campaign
                                </Text>
                                <Box p="2" align="center" rounded="lg">
                                  <video
                                    height="50px"
                                    width="50%"
                                    autoPlay
                                    src={advert}
                                    poster={advert}
                                  />
                                </Box>
                                <Flex align="center" justify="space-between">
                                  <Text fontWeight="600" fontSize="sm">
                                    {selectAdvertPopup
                                      ? "Confirm Advert"
                                      : "Change Advert"}
                                  </Text>
                                  <AiOutlineEdit
                                    onClick={uploadAdvertMedia}
                                    color="gray"
                                  />
                                </Flex>
                                {/* <Button p="2" width="100%" >{selectAdvertPopup ? "Confirm Advert" : "Change Advert"}</Button> */}
                              </Stack>
                            )}
                            {!selectAdvertPopup &&
                              advert === null &&
                              !selectMediaPopup && (
                                <Center
                                  flexDir="column"
                                  w="100%"
                                  bg=""
                                  border="1px dashed"
                                  p="2"
                                  borderColor="gray.200"
                                  rounded="md"
                                  cursor="pointer"
                                >
                                  <Text fontWeight="600" fontSize="md">
                                    Select your campaign media...
                                  </Text>
                                  <Box
                                    py="10"
                                    align="center"
                                    direction="column"
                                    maxW="500px"
                                    height="100px"
                                    mx="auto"
                                  >
                                    <AiOutlineUpload
                                      onClick={uploadAdvertMedia}
                                      fontSize="30px"
                                      color="gray"
                                    />
                                    <Text
                                      onClick={uploadAdvertMedia}
                                      fontSize="sm"
                                    >
                                      Click here to choose
                                    </Text>
                                  </Box>
                                </Center>
                              )}
                            {selectAdvertPopup && !selectThumbnailPopup && (
                              <FormControl id="advert">
                                <FormLabel htmlFor="advert" fontSize="sm">
                                  This is the advert for your physical screen...
                                </FormLabel>
                                {loadingMyMedia ? (
                                  <HLoading loading={loadingMyMedia} />
                                ) : errorMyMedia ? (
                                  <MessageBox variant="danger">
                                    {errorMyMedia}
                                  </MessageBox>
                                ) : (
                                  <>
                                    <Select
                                      id="advert"
                                      placeholder={advert}
                                      value={advert}
                                      onChange={chooseAdvert}
                                    >
                                      {medias?.map(
                                        (nft: Record<string, any>) => (
                                          <option
                                            style={{ color: "black" }}
                                            key={nft?.id}
                                            value={`https://ipfs.io/ipfs/${nft?.cid}`}
                                          >
                                            https://ipfs.io/ipfs/{nft?.cid}
                                          </option>
                                        )
                                      )}
                                    </Select>
                                  </>
                                )}
                              </FormControl>
                            )}
                            <hr />
                            {thumbnail !== null && !selectAdvertPopup && (
                              <Stack>
                                <Text fontSize="xs" fontWeight="600">
                                  This is the Thumbnail media of your campaign
                                </Text>
                                <Box p="2" align="center" rounded="lg">
                                  <video
                                    height="50px"
                                    width="50%"
                                    autoPlay
                                    src={thumbnail}
                                    poster={thumbnail}
                                  />
                                </Box>
                                <Flex align="center" justify="space-between">
                                  <Text fontWeight="600" fontSize="sm">
                                    {selectThumbnailPopup
                                      ? "Confirm Thumbnail"
                                      : "Change Thumbnail"}
                                  </Text>
                                  <AiOutlineEdit
                                    onClick={uploadThumbnailMedia}
                                    color="gray"
                                  />
                                </Flex>
                                {/* <Button p="2" width="100%" onClick={() => setSelectThumbnailPopup(!selectThumbnailPopup)}>{selectThumbnailPopup ? "Confirm Thumbnail" : "Change Thumbnail"}</Button> */}
                              </Stack>
                            )}
                            {!selectThumbnailPopup &&
                              thumbnail === null &&
                              advert !== null &&
                              !selectMediaPopup && (
                                <Center
                                  flexDir="column"
                                  w="100%"
                                  bg=""
                                  border="1px dashed"
                                  p="2"
                                  borderColor="gray.200"
                                  rounded="md"
                                  cursor="pointer"
                                >
                                  <Box
                                    py="10"
                                    align="center"
                                    direction="column"
                                    maxW="500px"
                                    height="100px"
                                    mx="auto"
                                  >
                                    <AiOutlineUpload
                                      onClick={uploadThumbnailMedia}
                                      fontSize="30px"
                                      color="gray"
                                    />
                                    <Text
                                      onClick={uploadThumbnailMedia}
                                      fontSize="sm"
                                    >
                                      Click here to choose{" "}
                                    </Text>
                                  </Box>
                                </Center>
                              )}
                            {selectThumbnailPopup && !selectAdvertPopup && (
                              <FormControl id="thumbnail">
                                <FormLabel htmlFor="thumbnail" fontSize="70%">
                                  This will be shown as a thumbnail for your
                                  audiences...
                                </FormLabel>
                                {loadingMyMedia ? (
                                  <HLoading loading={loadingMyMedia} />
                                ) : errorMyMedia ? (
                                  <MessageBox variant="danger">
                                    {errorMyMedia}
                                  </MessageBox>
                                ) : (
                                  <>
                                    <Select
                                      id="thumbnail"
                                      placeholder={thumbnail}
                                      value={thumbnail}
                                      onChange={chooseThumbnail}
                                    >
                                      {medias?.map(
                                        (nft: Record<string, any>) => (
                                          <option
                                            style={{ color: "black" }}
                                            key={nft?.id}
                                            value={`https://ipfs.io/ipfs/${nft?.cid}`}
                                          >
                                            https://ipfs.io/ipfs/{nft?.cid}
                                          </option>
                                        )
                                      )}
                                    </Select>
                                  </>
                                )}
                              </FormControl>
                            )}
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Stack>
                ) : (
                  <Stack>
                    {loadingScreenCalender ? (
                      <HLoading loading={loadingScreenCalender} />
                    ) : errorScreenCalender ? (
                      <MessageBox variant="danger">
                        {errorScreenCalender}
                      </MessageBox>
                    ) : (
                      <SimpleGrid gap="2" columns={[2]}>
                        <Box
                          p="4"
                          shadow="card"
                          rounded="md"
                          ref={React.createRef()}
                        >
                          <Text p="1" fontWeight="600" fontSize="md">
                            {calender ? "Calender Set" : "Calender Not Set"}
                          </Text>
                          <hr />
                          <FormControl
                            py="4"
                            width="100%"
                            align="center"
                            id="slotDateHere"
                          >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                inputVariant="outlined"
                                disablePast={true}
                                format="dd/MM/yyyy"
                                // variant="dialog"
                                label="Select Slot Date"
                                value={slotDateHere}
                                onChange={setSlotDateHere}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MiuiIconButton>
                                        <AiOutlineCalendar />
                                      </MiuiIconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                          <FormControl
                            py="4"
                            width="100%"
                            align="center"
                            id="startTime"
                          >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <TimePicker
                                inputVariant="outlined"
                                // format="hh:mm:ss"
                                variant="dialog"
                                label="Select Slot Start Time"
                                value={startTime}
                                onChange={setStartTime}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MiuiIconButton>
                                        <AiOutlineClockCircle />
                                      </MiuiIconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </FormControl>

                          <FormControl
                            py="4"
                            width="100%"
                            align="center"
                            id="endTime"
                          >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <TimePicker
                                inputVariant="outlined"
                                // format="hh:mm:ss"
                                variant="dialog"
                                label="Select Slot End Time"
                                value={endTime}
                                onChange={setEndTime}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MiuiIconButton>
                                        <AiOutlineClockCircle />
                                      </MiuiIconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                          <Flex px="8" pt="8" pb="2" justify="space-around">
                            <Slider
                              id="slotsPerDay"
                              min={1}
                              max={Math.round(
                                (endTime - startTime) / (1000 * 100)
                              )}
                              colorScheme="purple"
                              aria-label="slotsPerDay"
                              onChange={(val) => setSlotsPerDay(val)}
                            >
                              <SliderMark
                                value={slotsPerDay}
                                textAlign="center"
                                bg="purple.400"
                                color="white"
                                rounded="md"
                                mt="-10"
                                // mx="-7"
                                p="2"
                              >
                                {slotsPerDay}
                              </SliderMark>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                            </Slider>
                          </Flex>
                          <FormControl px="8" align="center" id="slotsPerDay">
                            <FormLabel textAlign="center" fontSize="xs">
                              Number of impressions required
                            </FormLabel>
                            <Input
                              id="slotsPerDay"
                              align="center"
                              justify="center"
                              onChange={(e) => setSlotsPerDay(e.target.value)}
                              placeholder={slotsPerDay}
                              value={slotsPerDay}
                              type="number"
                              width="75%"
                              size="lg"
                            />
                          </FormControl>
                        </Box>
                        <Box p="4" shadow="card" rounded="md">
                          <Text
                            p="1"
                            textAlign="center"
                            fontSize="md"
                            fontWeight="600"
                          >
                            Slot Booking Details
                          </Text>
                          <hr />
                          <Box
                            rounded="lg"
                            shadow="card"
                            border="1px"
                            borderColor="gray.300"
                            m="2"
                            px="4"
                            py="2"
                            align="start"
                          >
                            <Text fontSize="sm">Day Selected:</Text>
                            <Text fontSize="sm" fontWeight="600">
                              {slotDateHere.toString()}
                            </Text>
                          </Box>
                          <SimpleGrid p="2" columns={[1, 3]} gap="2">
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">Start Time:</Text>
                              <Text fontSize="lg" fontWeight="600">
                                {startTime.toLocaleTimeString()}
                              </Text>
                            </Box>
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">End Time:</Text>
                              <Text fontSize="lg" fontWeight="600">
                                {endTime.toLocaleTimeString()}
                              </Text>
                            </Box>
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">Minutes:</Text>
                              <Flex justify="space-between">
                                <Text fontSize="lg" fontWeight="600">
                                  {(endTime - startTime) / 1000 / 60}
                                </Text>
                                <Text pt="2" fontSize="xs">
                                  = {(endTime - startTime) / 1000} sec
                                </Text>
                              </Flex>
                            </Box>
                          </SimpleGrid>
                          <SimpleGrid p="2" columns={[1, 3]} gap="2">
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">Slots Chosen</Text>
                              <Text fontSize="lg" fontWeight="600">
                                {slotsPerDay}
                              </Text>
                            </Box>
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">Per Slot Cost</Text>
                              <Flex justify="space-between">
                                <Text fontSize="lg" fontWeight="600">
                                  {screen?.rentPerSlot}
                                </Text>
                                <Text pt="2" fontSize="xs">
                                  Ad Credits
                                </Text>
                              </Flex>
                            </Box>
                            <Box
                              rounded="lg"
                              shadow="card"
                              border="1px"
                              borderColor="gray.300"
                              px="4"
                              py="2"
                              align="start"
                            >
                              <Text fontSize="sm">Total Cost</Text>
                              <Flex justify="space-between">
                                <Text fontSize="lg" fontWeight="600">
                                  {slotsPerDay * screen?.rentPerSlot}
                                </Text>
                                <Text pt="2" fontSize="xs">
                                  Ad Credits
                                </Text>
                              </Flex>
                            </Box>
                          </SimpleGrid>
                          <hr />
                          <Box
                            rounded="lg"
                            shadow="card"
                            border="1px"
                            borderColor="gray.300"
                            m="2"
                            px="4"
                            py="2"
                            align="start"
                          >
                            <Text p="1" fontSize="md" fontWeight="600">
                              Slots Booking Summary
                            </Text>
                            <hr />
                            <Text p="1" fontSize="sm">
                              You need to pay{" "}
                              <strong>
                                {slotsPerDay * screen?.rentPerSlot} Ad Credits{" "}
                              </strong>
                              for running your ad campaign{" "}
                              <strong>{slotsPerDay} times </strong>
                              in{" "}
                              <strong>
                                {(
                                  (endTime - startTime) /
                                  1000 /
                                  (60 * 60)
                                ).toFixed(2)}{" "}
                                Hours
                              </strong>{" "}
                              between{" "}
                              <strong>{startTime.toLocaleTimeString()} </strong>
                              and{" "}
                              <strong>{endTime.toLocaleTimeString()} </strong>
                              on <strong>{slotDateHere.toString()} </strong>.
                            </Text>
                            <hr />
                            <Button
                              mt="2"
                              color="violet.500"
                              variant="outline"
                              width="100%"
                              type="submit"
                              // onClick={videoUpdateHandler}
                            >
                              Click to Pay
                            </Button>
                          </Box>
                        </Box>
                      </SimpleGrid>
                    )}
                    <Button
                      bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      width="100%"
                      type="submit"
                      onClick={videoUpdateHandler}
                    >
                      Upload Campaign
                    </Button>
                  </Stack>
                )}
              </Stack>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
