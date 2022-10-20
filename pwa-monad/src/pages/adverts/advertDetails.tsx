import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Box,
  Image,
  IconButton,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Link,
  Select,
  Input,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  AiOutlineStar,
  AiOutlineEye,
  AiOutlineArrowLeft,
  AiOutlineEdit,
  AiOutlineLike,
  AiOutlineFlag,
} from "react-icons/ai";
import { RiDashboard2Line } from "react-icons/ri";

import { detailsScreen } from "../../Actions/screenActions";
import { getScreenCalender } from "../../Actions/calendarActions";
import { getAdvertGameDetails } from "../../Actions/gameActions";
import {
  getVideoParams,
  getVideoDetails,
  // likeVideo,
  reviewVideo,
  // unlikeVideo,
} from "../../Actions/advertActions";
import { REVIEW_ADVERT_RESET } from "../../Constants/advertConstants";

import { useMedia } from "hooks";
import { MediaContainer } from "components/common";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { Rating } from "components/common";

export function AdvertDetails(props: any) {
  const videoId = window.location.href.split("/").slice()[4];
  const txId = window.location.href.split("/").slice()[5];
  const screenId = window.location.href.split("/").slice()[6];

  const navigate = useNavigate();

  const { data: media, isLoading, isError } = useMedia({ id: txId });
  // console.log(media);
  // const { data: nftData } = useNftData({ id: txId });
  // console.log("nft", { nft });
  const [comment, setComment] = React.useState<any>("");
  const [rating, setRating] = React.useState<any>(0);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const videoDetails = useSelector((state: any) => state.videoDetails);
  const { loading: loadingVideo, error: errorVideo, video } = videoDetails;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  // const screenCalender = useSelector((state: any) => state.screenCalender);
  // const {
  //   loading: loadingScreenCalender,
  //   error: errorScreenCalender,
  //   calender,
  // } = screenCalender;

  // const advertGameDetails = useSelector(
  //   (state: any) => state.advertGameDetails
  // );
  // const {
  //   loading: loadingAdvertGameDetails,
  //   error: errorAdvertGameDetails,
  //   advertGameData,
  // } = advertGameDetails;

  // const videoParams = useSelector((state: any) => state.videoParams);
  // const {
  //   loading: loadingVideoParams,
  //   error: errorVideoParams,
  //   params,
  // } = videoParams;

  const videoReview = useSelector((state: any) => state.videoReview);
  const {
    loading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
  } = videoReview;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  // console.log(window.location.href.split("/").slice()[5]);
  React.useEffect(() => {
    if (reviewSuccess) {
      window.alert("Review submitted successfully");
      setRating("");
      setComment("");
      dispatch({
        type: REVIEW_ADVERT_RESET,
      });
    }

    if (!userInfo) {
      navigate(redirect);
    }

    dispatch(getVideoDetails(videoId));

    dispatch(getAdvertGameDetails(videoId));
    dispatch(getVideoParams(videoId));
    dispatch(detailsScreen(screenId));
    dispatch(getScreenCalender(screenId));
  }, [
    dispatch,
    videoId,
    screenId,
    reviewSuccess,
    txId,
    userInfo,
    navigate,
    redirect,
  ]);

  // function likeHandler(videoId: any) {
  //   console.log("like");
  //   if (userInfo) {
  //     window.alert("Please signin again to confirm your like and continue...");
  //     dispatch(likeVideo(videoId));
  //     // dispatch(signout());
  //   } else {
  //     alert("please sign in to like the video");
  //   }
  // }

  // function unlikeHandler(videoId: any) {
  //   console.log("like");
  //   if (userInfo) {
  //     window.alert(
  //       "Please signin again to confirm your unlike and continue..."
  //     );
  //     dispatch(unlikeVideo(videoId));
  //     // dispatch(signout());
  //   } else {
  //     alert("please sign in to unlike the video");
  //   }
  // }

  const reviewHandler = (e: any) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(reviewVideo(videoId, { rating, comment, name: userInfo.name }));
    } else {
      alert("Please enter comment and rating");
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {loadingVideo || loadingScreen ? (
        <HLoading loading={loadingVideo || loadingScreen} />
      ) : errorVideo || errorScreen ? (
        <MessageBox variant="danger">{errorVideo || errorScreen}</MessageBox>
      ) : (
        <Box maxW="container.lg" mx="auto" pb="8">
          <Box>
            <Stack p="2" direction="row" justify="space-between">
              <AiOutlineArrowLeft
                onClick={() =>
                  navigate(
                    `/screen/${screen._id}/${
                      screen?.image?.split("/").slice(-1)[0]
                    }/${screen.activeGameContract}`
                  )
                }
              />
              <Text fontWeight="600">Campaign Details</Text>
              {video.uploader === userInfo._id ? (
                <IconButton
                  as={RouterLink}
                  to={`/editAdvert/${video._id}/${
                    video?.video.split("/").slice(-1)[0]
                  }/${video?.screen}`}
                  bg="none"
                  icon={<AiOutlineEdit size="20px" color="black" />}
                  aria-label="Edit Advert Details"
                ></IconButton>
              ) : (
                <IconButton
                  bg="none"
                  icon={<RiDashboard2Line size="20px" color="black" />}
                  aria-label="Dashboard"
                ></IconButton>
              )}
            </Stack>
            <hr />
            <Stack px="2">
              <Flex py="2" align="center">
                <Image src={video?.thumbnail} width="100px" rounded="md" />
                <Box p="4">
                  <Text fontSize="md" fontWeight="600">
                    {video?.title}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Created by: {video?.uploaderName}
                  </Text>
                </Box>
              </Flex>
              {isLoading ? (
                <HLoading loading={isLoading} />
              ) : isError ? (
                <MessageBox variant="danger">{isError}</MessageBox>
              ) : (
                <SimpleGrid gap="4" columns={[1, 2]}>
                  <Box
                    bg=""
                    shadow="card"
                    rounded="lg"
                    align="center"
                    justify=""
                  >
                    <MediaContainer media={media} />
                    <Flex p="4" align="center" justify="space-between">
                      <Box align="center">
                        <Text fontSize="xs">{video?.likedBy?.length || 0}</Text>
                        <AiOutlineLike />
                        <Text fontSize="xs">Likes</Text>
                      </Box>
                      <Box align="center">
                        <Text fontSize="xs">
                          {video?.flaggedBy?.length || 0}
                        </Text>
                        <AiOutlineFlag />
                        <Text fontSize="xs">Flags</Text>
                      </Box>
                      <Box align="center">
                        <Text fontSize="xs">{video?.rating || 0}</Text>
                        <AiOutlineStar />
                        <Text fontSize="xs">Ratings</Text>
                      </Box>
                      <Box align="center">
                        {/* <Text fontSize="xs">{media?.attention || 0}</Text> */}
                        <AiOutlineEye />
                        <Text fontSize="xs">Views</Text>
                      </Box>
                    </Flex>
                  </Box>
                  {loadingScreen ? (
                    <HLoading loading={loadingScreen} />
                  ) : errorScreen ? (
                    <MessageBox variant="danger">{errorScreen}</MessageBox>
                  ) : (
                    <Box p="4" shadow="card" rounded="lg">
                      <Stack p="2" justify="space-between">
                        <Text fontSize="xs">Running on screen</Text>
                        <Text fontSize="md" fontWeight="600">
                          {screen?.name}
                        </Text>
                      </Stack>
                      <hr />
                      <Stack p="2" justify="space-between">
                        <Text fontSize="xs" fontWeight="600">
                          {video.brandName} Brand
                        </Text>
                        <Text fontSize="xs" fontWeight="600">
                          {video.category} Category
                        </Text>
                      </Stack>
                      <hr />
                      <Stack p="2" direction="row" justify="space-between">
                        <Text fontSize="xs" fontWeight="600">
                          Total Earnings to be made: {video?.adBudget} Ad
                          Credits
                        </Text>
                      </Stack>
                      <hr />
                    </Box>
                  )}
                </SimpleGrid>
              )}
              {video.uploader === userInfo._id && (
                <SimpleGrid p="2" gap="4" columns={[1, 2]}>
                  <Button
                    onClick={() =>
                      navigate(
                        `/editAdvert/${video._id}/${
                          video?.video.split("/").slice(-1)[0]
                        }/${video?.screen}`
                      )
                    }
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
                    View Campaign
                  </Button>
                </SimpleGrid>
              )}
            </Stack>
            <Stack>
              <SimpleGrid p="2" gap="4" columns={[1, 2]}>
                {userInfo ? (
                  <Box shadow="card" rounded="lg" p="4">
                    <FormControl id="comment">
                      <FormLabel fontSize="xs">
                        Write a comment and get a chance to get free tokens...
                      </FormLabel>
                      <Stack direction="row" align="center">
                        <Input
                          id="comment"
                          onChange={(e: any) => setComment(e.target.value)}
                          placeholder={comment}
                          value={comment}
                          type="text"
                        />
                      </Stack>
                    </FormControl>
                    <Flex p="2" align="center" justify="space-between">
                      <Text fontSize="xs">
                        Reviewed By <strong>{video.numReviews}</strong>
                      </Text>
                      <Text fontSize="xs">
                        Average Ratings <strong>{video.rating}</strong>
                      </Text>
                    </Flex>
                    <Flex py="2" align="center" justify="space-between">
                      <Rating
                        rating={video.rating}
                        numReviews={video.numReviews}
                      ></Rating>
                      <FormControl p="2" id="rating">
                        <Stack direction="row" align="center">
                          <Select
                            title="rating"
                            value={rating}
                            onChange={(e: any) => setRating(e.target.value)}
                          >
                            <option value="">Rating...</option>
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very Good</option>
                            <option value="5">5- Excellent</option>
                          </Select>
                        </Stack>
                      </FormControl>
                    </Flex>
                    <hr />
                    <Button
                      bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      fontSize="xs"
                      size="sm"
                      width="100%"
                      type="submit"
                      onSubmit={reviewHandler}
                    >
                      Submit
                    </Button>
                    {reviewLoading && <HLoading loading={reviewLoading} />}
                    {reviewError && (
                      <MessageBox variant="danger">{reviewError}</MessageBox>
                    )}
                  </Box>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
                <Box shadow="card" rounded="lg" p="4">
                  {video?.reviews?.length === 0 && (
                    <MessageBox>There is no review</MessageBox>
                  )}
                  {video?.reviews?.map((review: any) => (
                    <Box shadow="card" p="2" rounded="lg" key={review?._id}>
                      <Flex>
                        <Text fontSize="md">{review?.name}</Text>
                        <Rating rating={review?.rating} caption=" "></Rating>
                      </Flex>
                      <Text fontSize="md">
                        {review?.createdAt?.substring(0, 10)}
                      </Text>
                      <hr />
                      <Text fontSize="md">{review?.comment}</Text>
                    </Box>
                  ))}
                </Box>
              </SimpleGrid>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
}
