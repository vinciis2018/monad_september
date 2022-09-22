import { useCallback, useState, useEffect } from "react";
// hooks
import { useUpload } from "components/contexts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
  AiOutlineUpload,
} from "react-icons/ai";
import { getFileData } from "services/utils";

export function PhotoView() {
  // hooks
  const navigate = useNavigate();
  const { fileUrl, setFileUrl, setThumb, fileType, setFileType } = useUpload();
  const [usingCam, setUsingCam] = useState<Boolean>(true);

  const [{ data }, setState] = useState<{
    data: any;
  }>({ data: null });
  const onDropAccepted = useCallback(
    async (acceptedFiles) => {
      setState((prevState) => ({
        ...prevState,
        step: 2,
        data: {
          ...data?.prevState,
          file: acceptedFiles[0],
          fileThumbnail: URL.createObjectURL(acceptedFiles[0]),
        },
      }));
      const file = acceptedFiles[0];
      const fileThumbnail = URL.createObjectURL(acceptedFiles[0]);
      // console.log(fileThumbnail);
      // console.log(file.type);
      setFileType(file.type);
      const [dataBuffer] = await getFileData(fileThumbnail);
      // console.log(dataBuffer);
      setFileUrl(dataBuffer);
      setThumb(fileThumbnail);
    },
    [data?.prevState, setFileType, setFileUrl, setThumb]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    // accept: "image/*, video/*, .json",
    multiple: false,
    // maxSize: 15728640,
  });

  useEffect(() => {
    if (fileUrl) {
      setUsingCam(true);
      setFileUrl(fileUrl);
    } else {
      setUsingCam(false);
    }
  }, [fileUrl, setFileUrl, usingCam]);

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

          {usingCam ? (
            <Box rounded="lg" align="center">
              {/* <Image onClick={() => setImageUrl("")} rounded="lg" src={imageUrl} alt="icon" width="360px" /> */}
              <Box onClick={() => setFileUrl("")}>
                <ThumbnailContainer
                  fileThumbnail={data?.fileThumbnail}
                  file={fileUrl}
                  fileType={fileType}
                />
              </Box>
              <Button
                width="100%"
                variant="outline"
                color="violet.500"
                mt="4"
                onClick={() => navigate("/upload-tags")}
              >
                Add Details
              </Button>
            </Box>
          ) : (
            <Center
              flexDir="column"
              w="100%"
              bg="gray.100"
              border="1px dashed"
              p="2"
              borderColor="blue.500"
              rounded="md"
              cursor="pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Box
                align="center"
                direction="column"
                maxW="500px"
                mx="auto"
                mt="2"
              >
                <AiOutlineUpload fontWeight="600" fontSize="2xl" />
                <Text p="2" fontSize="sm">
                  Click or drag n' drop here to upload.{" "}
                </Text>
              </Box>
            </Center>
          )}
        </Stack>
      </Center>
    </Box>
  );
}

const ThumbnailContainer = ({
  file,
  fileThumbnail,
  fileType,
}: {
  file: any;
  fileThumbnail: any;
  fileType: any;
}) => {
  useEffect(() => {}, [file, fileThumbnail, fileType]);

  return (
    <Stack>
      <Text color="black.500" align="center" fontSize="xs">
        Click to upload a new one from your storage
      </Text>
      <Box rounded="xl" overflow="hidden" shadow="card">
        {fileType === "image/png" && (
          <Image
            src={fileThumbnail}
            alt="click to upload"
            boxSize="100%"
            objectFit="cover"
            width={"auto"}
            height={111}
          />
        )}
        {fileType === "video/mp4" && (
          <Box as="video" autoPlay loop controls muted boxSize="100%">
            <source src={fileThumbnail} />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
