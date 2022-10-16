import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  // Tooltip,
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
import { AiOutlineHome, AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { generateVideoFromImages, getMyMedia } from "Actions/mediaActions";

export function CustomImages() {
  const [images, setImages] = useState<any>([]);

  const [image, setImage] = useState<any>(null);

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const dispatch = useDispatch<any>();
  const removeImage = (i: any) => {
    setImage(null);
    setImages(images.filter((img: any, id: any) => id !== i));
  };

  useEffect(() => {
    if (image) {
      images.push(image);
      setImages(images);
    }
    dispatch(getMyMedia());
  }, [dispatch, image, images]);

  const sendImages = () => {
    console.log(images);
    window.alert(`Sending ${images.length} images for creating video`);
    dispatch(generateVideoFromImages(images));
  };

  return (
    <Box px="2" pt="20" color="black">
      <Center maxW="container.lg" pt="10" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineHome
              size="20px"
              color="black"
              // onClick={() => navigate(`/upload`)}
            />
            <Text fontSize="lg" fontWeight="600">
              Create Video
            </Text>
            <AiOutlineUpload
              size="20px"
              color="black"
              // onClick={() =>
              // navigate(`/wallet/${userInfo._id}/${getArweavePublicAddress()}`)
              // }
            />
          </Flex>
          <hr />
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
