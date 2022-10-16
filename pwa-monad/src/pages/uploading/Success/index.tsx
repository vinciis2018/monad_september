import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Box,
  SimpleGrid,
  Tooltip,
  Image,
  Center,
  Flex,
  Stack,
  Text,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import {
  AiOutlineCopy,
  AiOutlineShareAlt,
  AiOutlineCheck,
  AiOutlineArrowLeft,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { getMedia } from "Actions/mediaActions";

export function Success() {
  const mediaId = window.location.href.split("/").slice()[4];
  const navigate = useNavigate();
  const [linkType, setLinkType] = useState("share");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const mediaGet = useSelector((state: any) => state.mediaGet);
  const { loading: loadingMedia, error: errorMedia, media } = mediaGet;

  const { hasCopied, onCopy } = useClipboard(`https://ipfs.io/ipfs/${mediaId}`);

  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getMedia(mediaId));
  }, [dispatch, mediaId]);
  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Flex p="4" justify="space-between" align="center">
            <AiOutlineArrowLeft
              size="20px"
              color="black"
              onClick={() => navigate(-1)}
            />
            <Text fontSize="lg" fontWeight="600">
              NFT Creation
            </Text>
            <AiOutlineCloseCircle
              size="20px"
              color="black"
              onClick={() =>
                navigate(
                  `/userProfile/${userInfo._id}/${userInfo.defaultWallet}`
                )
              }
            />
          </Flex>
          <hr />
          {loadingMedia ? (
            <HLoading loading={loadingMedia} />
          ) : errorMedia ? (
            <MessageBox variant="danger">{errorMedia}</MessageBox>
          ) : (
            <Box align="center">
              <Tooltip
                rounded="lg"
                shadow="card"
                bgColor="violet.500"
                p="4"
                label="paisa hi paisa hoga"
                aria-label="A tooltip"
              >
                <Image
                  alt="paisa hi paisa hoga"
                  p="4"
                  src={`https://cdn3d.iconscout.com/3d/premium/thumb/funny-activity-3027486-2526705.png`}
                />
              </Tooltip>
              <Text textAlign="center" fontSize="sm">
                {" "}
                Your media is being archived{" "}
              </Text>
              <Text p="2" align="center" fontSize="xs" fontWeight="600">
                When your content gets enough traffic, you will be able to store
                it permanently using attention rewards.
              </Text>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ marginY: "24px" }}
              >
                <Stack spacing="34px" direction="row">
                  <AiOutlineShareAlt
                    fontSize="40px"
                    color="teal"
                    onClick={() => setLinkType("share")}
                  />
                  <AiOutlineCopy
                    fontSize="40px"
                    color="indigo"
                    onClick={() => setLinkType("embed")}
                  />
                </Stack>
              </Box>
              <Box p="2">
                <Text fontSize="sm" fontWeight="600">
                  {linkType === "share" ? "Share" : "Embed"}
                </Text>
                <Text fontSize="xs">
                  {linkType === "share"
                    ? `https://ipfs.io/ipfs/${mediaId}`
                    : `<iframe width="100%" src=${media.fileUrl} title="Monad Upload" frameborder="0" allowfullscreen></iframe>`}
                </Text>
              </Box>
              <SimpleGrid gap="4" columns={[1, 2]}>
                <Button
                  m="2"
                  variant="outline"
                  color="violet.500"
                  width="100%"
                  // eslint-disable-next-line no-constant-condition
                  rightIcon={"copied" ? <AiOutlineCheck /> : <AiOutlineCopy />}
                  onClick={onCopy}
                >
                  {hasCopied ? "Copied!" : "Copy Link"}
                </Button>
                <Button
                  m="2"
                  bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                  width="100%"
                  // eslint-disable-next-line no-constant-condition
                  rightIcon={"copied" ? <AiOutlineCheck /> : <AiOutlineCopy />}
                  onClick={() => window.open(`/nft/${mediaId}`)}
                >
                  See Media
                </Button>
              </SimpleGrid>
            </Box>
          )}
        </Stack>
      </Center>
    </Box>
  );
}
