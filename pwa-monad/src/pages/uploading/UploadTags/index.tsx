import { useState, useEffect } from "react";
// hooks
import { useUpload } from "components/contexts";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Center,
  Flex,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import MessageBox from "components/atoms/MessageBox";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import MediaContainer from "components/widgets/MediaContainer";

export function UploadTags() {
  const navigate = useNavigate();
  const {
    fileUrl,
    setFileUrl,
    thumb,
    setThumb,
    fileType,
    tags,
    setTags,
    setDescription,
    setTitle,
    setNsfw,
  } = useUpload();
  const [myTitle, setMyTitle] = useState<any>("");
  const [myDescription, setMyDesription] = useState<any>("");
  const [myNsfw, setMyNsfw] = useState<any>("");
  const [tagString, setTagString] = useState<any>("");

  const [err, setErr] = useState<any>("");

  useEffect(() => {
    // console.log(fileUrl);
    // console.log(thumb);
    if (tagString) {
      setTags(
        tagString.split(",").map((_string: any) => _string.split(" ").join(""))
      );
    }
    if (fileUrl) {
      setFileUrl(fileUrl);
    }
    if (thumb) {
      setThumb(thumb);
    }
  }, [tagString, fileUrl, setTags, setFileUrl, thumb, setThumb]);

  const onSubmit = () => {
    let error = "";
    if (!fileUrl) error = "No media found";
    if (myTitle === "") error = "Please input a title";
    if (myDescription === "") error = "Please input a description";
    if (error !== "") {
      setErr(error);
    } else {
      setErr("");
      setTitle(myTitle);
      setDescription(myDescription);
      setNsfw(myNsfw);
      navigate("/upload-confirm");
    }
  };

  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
            <Text fontSize="lg" fontWeight="600">
              NFT Creation
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          <Stack>
            <Box align="center" onClick={() => setFileUrl("")}>
              <MediaContainer fileThumbnail={thumb} fileType={fileType} />
            </Box>
            {/* <Image rounded="lg" src={imageUrl} alt="icon" width={"auto"} height={111} onClick/> */}
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
            {err && <MessageBox variant="danger">{err}</MessageBox>}
            <Button variant="outline" color="violet.500" onClick={onSubmit}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Box>
  );
}
