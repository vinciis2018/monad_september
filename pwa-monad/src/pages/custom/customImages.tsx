import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  // Tooltip,
  Checkbox,
  Input,
  Image,
  Center,
  Flex,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import {
  generateVideoFromImages,
  getMyMedia,
  uploadMedia,
} from "Actions/mediaActions";
import { useUpload, useWallet } from "components/contexts";
import { ContentUploadService } from "services";
import { ERROR_IDS } from "utils/constants";

export function CustomImages() {
  const navigate = useNavigate();
  const { signMessage, getArweavePublicAddress } = useWallet();
  const { tags, setTags } = useUpload();
  const [loading, setLoading] = useState(false);
  const [myTitle, setMyTitle] = useState<any>("");
  const [myDescription, setMyDesription] = useState<any>("");
  const [myNsfw, setMyNsfw] = useState<any>("");
  const [tagString, setTagString] = useState<any>("");
  const [images, setImages] = useState<any>([]);
  const [duration, setDuration] = useState<any>(20);
  const [height, setHeight] = useState<any>(720);
  const [width, setWidth] = useState<any>(1280);
  const [image, setImage] = useState<any>(null);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { oading: loadingUser, error: errorUser, userInfo } = userSignin;

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const videoFromImages = useSelector((state: any) => state.videoFromImages);
  const { loading: loadingVideo, error: errorVideo, video } = videoFromImages;

  const dispatch = useDispatch<any>();
  const removeImage = (i: any) => {
    setImage(null);
    setImages(images.filter((img: any, id: any) => id !== i));
  };

  useEffect(() => {
    if (!getArweavePublicAddress()) {
      navigate("/login");
    }

    if (image) {
      images.push(image);
      setImages(images);
    }
    if (tagString) {
      if (tagString) {
        setTags(
          tagString
            .split(",")
            .map((_string: any) => _string.split(" ").join(""))
        );
      }
    }
    dispatch(getMyMedia());
  }, [
    dispatch,
    image,
    images,
    video,
    tagString,
    setTags,
    getArweavePublicAddress,
    navigate,
  ]);

  const sendImages = () => {
    // console.log(images);
    window.alert(`Sending ${images.length} images for creating video`);
    dispatch(generateVideoFromImages(images, duration, width, height));
  };

  const onClickUpload = () => {
    if (video) {
      setLoading(true);
      const strCid = video.cid;
      dispatch(
        uploadMedia({
          cid: strCid,
          owner: userInfo.defaultWallet,
          userId: userInfo._id,
        })
      );
      // console.log(fileUrl);
      return signMessage(strCid)
        .then((cidSignature) =>
          ContentUploadService.submitCidWithMetadata({
            name: myTitle,
            description: myDescription,
            tags: tagString,
            nsfw: myNsfw,
            owner: userInfo.defaultWallet,
            cid: strCid,
            cidSignature,
          })
        )
        .catch((error: Error) => {
          setLoading(false);
          if (error.message?.includes(ERROR_IDS.WALLET_LOCKED)) {
            navigate("/login");
          }
        })
        .then(() => {
          navigate(`/upload-success/${strCid}`);
        });
    }
  };

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
              Create Video
            </Text>
            <AiOutlineUpload
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          {loadingVideo && <HLoading loading={loadingVideo} />}
          {errorVideo && <MessageBox variant="danger">{errorVideo}</MessageBox>}
          {loading && <HLoading loading={loading} />}
          {video && (
            <Stack>
              <Box as="video" autoPlay loop controls muted boxSize="100%">
                <source src={`https://ipfs.io/ipfs/${video.cid}`} />
              </Box>
              <FormControl id="title">
                <FormLabel fontSize="xs">Find the perfect name</FormLabel>
                <Stack direction="row" align="center">
                  <Input
                    id="title"
                    onChange={(e) => {
                      setMyTitle(e.target.value);
                    }}
                    placeholder={myTitle}
                    value={myTitle}
                    type="text"
                  />
                </Stack>
              </FormControl>
              <FormControl id="description">
                <FormLabel fontSize="xs">Tell everyone about it</FormLabel>
                <Stack direction="row" align="center">
                  <Input
                    id="description"
                    onChange={(e) => {
                      setMyDesription(e.target.value);
                    }}
                    placeholder={myDescription}
                    value={myDescription}
                    type="text"
                  />
                </Stack>
              </FormControl>
              <FormControl id="tags">
                <FormLabel fontSize="xs">
                  Input tags here with a “,” and hit space bar
                </FormLabel>
                <Stack direction="row" align="center">
                  <Input
                    id="tags"
                    onChange={(e) => {
                      setTagString(e.target.value);
                    }}
                    placeholder={tagString}
                    // value={tags}
                    type="text"
                  />
                </Stack>
              </FormControl>
              {tags && tags.length > 0 && (
                <Flex p="1" justify="space-between">
                  {tags.map(
                    (_tag, _i) =>
                      _tag && (
                        <Box
                          key={_i}
                          rounded="md"
                          px="2"
                          py="1"
                          bgColor="violet.200"
                        >
                          <Text color="black.500">{_tag}</Text>
                        </Box>
                      )
                  )}
                </Flex>
              )}
              <FormControl id="nsfw">
                <FormLabel>
                  {" "}
                  This content is{" "}
                  <strong style={{ color: "#FCC78F" }}>Explicit or 18+.</strong>
                </FormLabel>
                <Stack direction="row" align="center">
                  <Checkbox
                    id="nsfw"
                    onChange={(e) => setMyNsfw(e.target.value)}
                    flexShrink="0"
                  >
                    NSFW
                  </Checkbox>
                </Stack>
              </FormControl>
              <Button
                width="100%"
                variant="outline"
                color="violet.500"
                mt="4"
                onClick={() => onClickUpload()}
              >
                Add Details
              </Button>
            </Stack>
          )}
          <Text fontSize="md">
            Please Select the timeperiod of one frame or total duration in
            seconds
          </Text>
          <SimpleGrid gap="2" columns={[2]}>
            <FormControl id="">
              <FormLabel htmlFor="advert" fontSize="sm">
                TimePeriod of one frame
              </FormLabel>
              <Stack direction="row" align="center">
                <Input
                  id="timePeriodOfOneFrame"
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={duration}
                  value={duration}
                  type="number"
                />
              </Stack>
            </FormControl>
            <FormControl id="">
              <FormLabel htmlFor="advert" fontSize="sm">
                Duration of complete video
              </FormLabel>
              <Stack direction="row" align="center">
                <Input
                  id="totalTimePeriod"
                  onChange={(e: any) =>
                    setDuration(e.target.value / images.length)
                  }
                  value={duration * images.length}
                  type="number"
                />
              </Stack>
            </FormControl>
          </SimpleGrid>
          <hr />
          <Text fontSize="sm">
            Your current video resolution is {width} X {height}
          </Text>
          <SimpleGrid gap="2" columns={[2]}>
            <FormControl id="resolution">
              <FormLabel fontSize="sm">Width of your Video</FormLabel>
              <Stack direction="row" align="center">
                <Select
                  placeholder={width}
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                >
                  <option key={1} value={1920}>
                    1920
                  </option>
                  <option key={2} value={1280}>
                    1280
                  </option>
                  <option key={3} value={640}>
                    640
                  </option>
                  <option key={4} value={2560}>
                    2560
                  </option>
                  <option key={5} value={2048}>
                    2048
                  </option>
                </Select>
              </Stack>
            </FormControl>
            <FormControl id="resolution">
              <FormLabel fontSize="xs">Height of your video</FormLabel>
              <Stack direction="row" align="center">
                <Select
                  placeholder={height}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                >
                  <option key={1} value={1080}>
                    1080
                  </option>
                  <option key={2} value={720}>
                    720
                  </option>
                  <option key={3} value={480}>
                    480
                  </option>
                  <option key={4} value={1440}>
                    1440
                  </option>
                  <option key={5} value={1080}>
                    1080
                  </option>
                </Select>
              </Stack>
            </FormControl>
          </SimpleGrid>
          <FormControl id="advert">
            <FormLabel htmlFor="advert" fontSize="sm">
              This is the advert for your physical screen...
            </FormLabel>
            {loadingMyMedia ? (
              <HLoading loading={loadingMyMedia} />
            ) : errorMyMedia ? (
              <MessageBox variant="danger">{errorMyMedia}</MessageBox>
            ) : (
              <Select
                id="advert"
                placeholder={image}
                value={image || ""}
                onChange={(e) => setImage(e.target.value)}
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
              </Select>
            )}
          </FormControl>
          <Text>{images.length}</Text>
          <SimpleGrid py="2" gap={2} columns={[1, 2, 3]}>
            {images?.map((img: any, i: any) => (
              <Box
                p="1"
                rounded="md"
                shadow="card"
                key={i}
                onClick={() => removeImage(i)}
              >
                {/* <Text>
                  {img} {i}
                </Text> */}
                <Box px="2" py="1" align="right">
                  <AiOutlineClose />
                </Box>
                <Image rounded="lg" src={img} />
              </Box>
            ))}
          </SimpleGrid>
          {images.length !== 0 && (
            <Button variant="outline" color="violet.500" onClick={sendImages}>
              Create Campaign Media File
            </Button>
          )}
        </Stack>
      </Center>
    </Box>
  );
}
