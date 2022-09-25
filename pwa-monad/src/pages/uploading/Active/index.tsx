import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tooltip,
  Image,
  Center,
  Flex,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Camera } from "react-camera-pro";

import { useUpload, useWallet } from "components/contexts";
import { useDropzone } from "react-dropzone";

import {
  AiOutlineHome,
  AiOutlineUpload,
  AiOutlineSetting,
} from "react-icons/ai";
import { getFileData } from "services/utils";
import {
  CameraType,
  FacingMode,
} from "react-camera-pro/dist/components/Camera/types";
import LayoutUpload from "components/organisms/LayoutUpload";
import CameraHandlers from "components/molecules/CameraHandlers";
import { useSelector } from "react-redux";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

export function Active() {
  const navigate = useNavigate();

  const { fileUrl, setFileUrl, setThumb, fileType, setFileType } = useUpload();
  const camera = useRef<CameraType>(null);
  const [facingMode, setFacingMode] = useState<FacingMode>("environment");

  const [uploader, setUploader] = useState<Boolean>(false);
  const [usingCam, setUsingCam] = useState<Boolean>(false);

  const { getArweavePublicAddress } = useWallet();

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

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading: loadingUser, error: errorUser } = userSignin;

  useEffect(() => {
    if (!getArweavePublicAddress()) {
      navigate("/login");
    }

    if (fileUrl) {
      setUsingCam(true);
      setFileUrl(fileUrl);
    } else {
      setUsingCam(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl, userInfo, usingCam, navigate]);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setFileUrl(photo);
      // navigate.push("/upload-photos");
      navigate("/upload-photos");
    }
  };

  const onSwitch = () => {
    facingMode === "user"
      ? setFacingMode("environment")
      : setFacingMode("user");
    if (camera.current) camera.current.switchCamera();
  };

  const clearData = (e: any) => {
    setState({
      data: null,
    });
    setFileUrl("");
  };

  const startUpload = ({ data }: any) => {
    // console.log(data);
    navigate("/upload-tags");
  };

  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pt="10" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineHome
              size="20px"
              color="black"
              onClick={() => navigate(`/`)}
            />
            <Text fontSize="xl" fontWeight="600" color="black.500">
              Welcome to Monad
            </Text>
            {/* <AiOutlineUpload onClick={() => navigate.push("/upload-photos")} size="20px" color="black" /> */}
            <AiOutlineSetting
              onClick={() => navigate("/setting")}
              size="20px"
              color="black"
            />
          </Flex>
          <hr />
          <LayoutUpload paddingTop="0px">
            <Camera
              ref={camera}
              facingMode={facingMode}
              aspectRatio={1 / 2}
              errorMessages={{
                noCameraAccessible:
                  "No camera device accessible. Please connect your camera or try a different browser.",
                permissionDenied:
                  "Permission denied. Please refresh and give camera permission.",
                switchCamera:
                  "It is not possible to switch camera to different one because there is only one video device accessible.",
                canvas: "Canvas is not supported.",
              }}
            />
            <CameraHandlers onShut={takePhoto} onSwitch={onSwitch} />
          </LayoutUpload>
          <Text
            textAlign="center"
            fontSize="sm"
            color="black.500"
            fontWeight="600"
          >
            Upload your NFT media file here to use it in your campaigns
          </Text>
          {usingCam ? (
            <Box rounded="lg" align="center">
              <Box onClick={(e: any) => clearData(e)}>
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
                onClick={() => startUpload({ data })}
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
                color="black"
              >
                <AiOutlineUpload fontWeight="600" fontSize="2xl" />
                <Text p="2" fontSize="sm">
                  Click or drag n' drop here to upload.{" "}
                </Text>
              </Box>
            </Center>
          )}

          {loadingUser ? (
            <HLoading loading={loadingUser} />
          ) : errorUser ? (
            <MessageBox variant="danger">{errorUser}</MessageBox>
          ) : (
            <Tooltip
              rounded="lg"
              shadow="card"
              bgColor="violet.500"
              p="4"
              label="click karo, paisa hi paisa hoga"
              aria-label="A tooltip"
            >
              <Image
                onClick={() => setUploader(!uploader)}
                alt="click karo, paisa hi paisa hoga"
                p="4"
                src={`https://cdn3d.iconscout.com/3d/premium/thumb/startup-3025714-2526912.png`}
              />
            </Tooltip>
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
