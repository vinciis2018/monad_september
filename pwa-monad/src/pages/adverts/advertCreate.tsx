import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Center,
  Flex,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

import {
  AiOutlineArrowLeft,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineCheck,
} from "react-icons/ai";

import { UPLOAD_ADVERT_RESET } from "../../Constants/advertConstants";
import { uploadVideo } from "../../Actions/advertActions";
import { useWallet } from "components/contexts";

// import { useNft } from "hooks";
// import { NftMediaContainer } from "components/common/NftMediaContainer/index";
// import { useArtist } from "hooks";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { getMyMedia } from "Actions/mediaActions";
import { ThumbnailCard } from "components/cards";

export function AdvertCreate(props: any) {
  const screenId = window.location.href.split("/").slice()[4];
  // const userId = window.location.href.split("/").slice()[5];

  const navigate = useNavigate();
  const { isLoading } = useWallet();

  // const {
  //   data: artist,
  //   isLoading: isLoadingArtist,
  //   isError: isErrorArtist,
  // } = useArtist({ id: walletAddress });

  // const txId = props.match.params.txId;
  // const {
  //   data: nft,
  //   isLoading: isLoadingNft,
  //   isError: isErrorNft,
  // } = useNft({ id: txId });

  const [advert, setAdvert] = React.useState<any>(null);
  const [thumbnail, setThumbnail] = React.useState<any>(null);

  const [selectThumbnailPopup, setSelectThumbnailPopup] =
    React.useState<any>(false);
  const [selectAdvertPopup, setSelectAdvertPopup] = React.useState<any>(false);
  const [selectMediaPopup, setSelectMediaPopup] = React.useState<any>(false);

  // const screenDetails = useSelector((state: any) => state.screenDetails);
  // const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const videoUpload = useSelector((state: any) => state.videoUpload);
  const {
    loading: loadingVideoSave,
    success: successVideoSave,
    error: errorVideoSave,
    uploadedVideo,
  } = videoUpload;

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    console.log(screenId);
    if (isLoading) {
      window.alert("Please login with your wallet to continue");
    }

    if (successVideoSave) {
      dispatch({
        type: UPLOAD_ADVERT_RESET,
      });
      window.alert(
        "Hey, you just uploaded you campaign media, please proceed to fill the campaig details..."
      );
      navigate(
        `/editAdvert/${uploadedVideo._id}/${
          uploadedVideo?.video.split("/").slice(-1)[0]
        }/${screenId}`
      );
    }

    if (!userInfo) {
      navigate("/signin");
    }
    dispatch(getMyMedia());
  }, [
    dispatch,
    successVideoSave,
    isLoading,
    userInfo,
    navigate,
    uploadedVideo,
    screenId,
  ]);

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

  const videoUploadHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      uploadVideo(screenId, {
        advert,
        thumbnail,
        defaultWallet: userInfo.defaultWallet,
      })
    );
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack align="center" p="2" direction="row" justify="space-between">
          <AiOutlineArrowLeft onClick={() => navigate(-1)} />
          <Text fontWeight="600">Create Campaign</Text>
          <AiOutlineEdit color="white" />
        </Stack>
        {loadingVideoSave && <HLoading loading={loadingVideoSave} />}
        {errorVideoSave && (
          <MessageBox variant="danger">{errorVideoSave}</MessageBox>
        )}
        <Stack p="2">
          {!isLoading && (
            <Stack>
              {advert !== null && (
                <Stack>
                  <Text fontSize="sm" fontWeight="600">
                    This is the advert media of your campaign
                  </Text>
                  <Box p="2" align="center">
                    <video
                      height="50px"
                      width="50%"
                      autoPlay
                      src={advert}
                      poster={advert}
                    />
                  </Box>
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600">
                      {selectAdvertPopup ? "Confirm Advert" : "Change Advert"}
                    </Text>
                    {selectAdvertPopup ? (
                      <AiOutlineCheck
                        onClick={uploadAdvertMedia}
                        color="green"
                      />
                    ) : (
                      <AiOutlineEdit onClick={uploadAdvertMedia} color="gray" />
                    )}
                  </Flex>
                  {/* <Button p="2" width="100%" >{selectAdvertPopup ? "Confirm Advert" : "Change Advert"}</Button> */}
                </Stack>
              )}
              {!selectAdvertPopup && advert === null && !selectMediaPopup && (
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
                    onClick={uploadAdvertMedia}
                    py="10"
                    align="center"
                    direction="column"
                    maxW="500px"
                    height="100px"
                    mx="auto"
                  >
                    <AiOutlineUpload fontSize="30px" color="gray" />
                    <Text fontSize="sm">Click here to choose</Text>
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
                    <MessageBox variant="danger">{errorMyMedia}</MessageBox>
                  ) : (
                    <Stack>
                      <Select
                        id="advert"
                        placeholder={advert}
                        value={advert || ""}
                        onChange={chooseAdvert}
                      >
                        {medias?.map((nft: Record<string, any>) => (
                          <option
                            style={{ color: "black" }}
                            key={nft?.cid}
                            value={`https://ipfs.io/ipfs/${nft?.cid}`}
                          >
                            https://ipfs.io/ipfs/{nft?.cid}
                          </option>
                        ))}
                        {/* {artist?.nfts.map((nft: Record<string, any>) => (
                          <option
                            key={nft?.id}
                            value={`https://arweave.net/${nft?.id}`}
                          >
                            {nft?.id}
                          </option>
                        ))} */}
                      </Select>
                      <SimpleGrid gap="4" columns={[1, 2, 3]}>
                        {medias?.map((media: any, index: any) => (
                          <Box
                            align="center"
                            p=""
                            key={index}
                            rounded="md"
                            shadow="card"
                            onClick={() =>
                              setAdvert(`https://ipfs.io/ipfs/${media?.cid}`)
                            }
                          >
                            <ThumbnailCard nft={media} />
                            <Text p="1" fontSize="10" fontWeight="600">
                              {media.cid}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Stack>
                  )}
                </FormControl>
              )}
              <hr />
              {thumbnail !== null && !selectAdvertPopup && (
                <Stack>
                  <Text fontSize="sm" fontWeight="600">
                    This is the Thumbnail media of your campaign
                  </Text>
                  <Box p="2" align="center">
                    <video
                      height="50px"
                      width="50%"
                      autoPlay
                      src={thumbnail}
                      poster={thumbnail}
                    />
                  </Box>
                  <Flex align="center" justify="space-between">
                    <Text fontWeight="600">
                      {selectThumbnailPopup
                        ? "Confirm Thumbnail"
                        : "Change Thumbnail"}
                    </Text>
                    {selectThumbnailPopup ? (
                      <AiOutlineCheck
                        onClick={uploadThumbnailMedia}
                        color="green"
                      />
                    ) : (
                      <AiOutlineEdit
                        onClick={uploadThumbnailMedia}
                        color="gray"
                      />
                    )}
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
                      <Text onClick={uploadThumbnailMedia} fontSize="sm">
                        Click here to choose{" "}
                      </Text>
                    </Box>
                  </Center>
                )}
              {selectThumbnailPopup && !selectAdvertPopup && (
                <FormControl id="thumbnail">
                  <FormLabel htmlFor="thumbnail" fontSize="70%">
                    This will be shown as a thumbnail for your audiences...
                  </FormLabel>
                  {loadingMyMedia ? (
                    <HLoading loading={loadingMyMedia} />
                  ) : errorMyMedia ? (
                    <MessageBox variant="danger">{errorMyMedia}</MessageBox>
                  ) : (
                    <Stack>
                      <Select
                        id="thumbnail"
                        placeholder={thumbnail}
                        value={thumbnail || ""}
                        onChange={chooseThumbnail}
                      >
                        {medias?.map((nft: Record<string, any>) => (
                          <option
                            style={{ color: "black" }}
                            key={nft?.cid}
                            value={`https://ipfs.io/ipfs/${nft?.cid}`}
                          >
                            https://ipfs.io/ipfs/{nft?.cid}
                          </option>
                        ))}
                        {/* {artist?.nfts.map((nft: Record<string, any>) => (
                          <option
                            key={nft?.id}
                            value={`https://arweave.net/${nft?.id}`}
                          >
                            {nft?.id}
                          </option>
                        ))} */}
                      </Select>
                      <SimpleGrid gap="4" columns={[1, 2, 3]}>
                        {medias?.map((media: any, index: any) => (
                          <Box
                            align="center"
                            p=""
                            key={index}
                            rounded="md"
                            shadow="card"
                            onClick={() =>
                              setThumbnail(`https://ipfs.io/ipfs/${media?.cid}`)
                            }
                          >
                            <ThumbnailCard nft={media} />
                            <Text p="1" fontSize="10" fontWeight="600">
                              {media.cid}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Stack>
                  )}
                </FormControl>
              )}

              {selectMediaPopup && (selectAdvertPopup || selectThumbnailPopup) && (
                <SimpleGrid gap="4" columns={[1, 2]}>
                  {/* {artist?.nfts.map((nft: Record<string, any>) => (
                    <Stack
                      rounded="md"
                      border="1px"
                      borderColor="gray.200"
                      key={nft?.id}
                    >
                      {isLoadingNft ? (
                        <HLoading loading={isLoadingNft} />
                      ) : isErrorNft ? (
                        <MessageBox variant="danger">{isErrorNft}</MessageBox>
                      ) : (
                        <Flex
                          align="center"
                          justify="space-between"
                          rounded="md"
                          p="1"
                        >
                          <Box p="1">
                            <Text fontSize="md" fontWeight="600">
                              {" "}
                              NFT ID
                            </Text>
                            <Text fontSize="xs">{nft?.id}</Text>
                          </Box>
                          <Box rounded="md" width="50px">
                            <NftMediaContainer nft={nft} />
                          </Box>
                        </Flex>
                      )}
                    </Stack>
                  ))} */}
                </SimpleGrid>
              )}
              <Button
                bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                width="100%"
                type="submit"
                onClick={videoUploadHandler}
              >
                Upload Campaign
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
