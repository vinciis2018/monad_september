import { useState } from "react";
import { useNavigate } from "react-router-dom";
// hooks
import { useIpfs, useUpload, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";

import { ContentUploadService } from "services";
import { ERROR_IDS } from "utils/constants";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import {
  Box,
  Center,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import MediaContainer from "components/widgets/ThumbnailContainer";
import { useDispatch } from "react-redux";
import { uploadMedia } from "Actions/mediaActions";
import { useSelector } from "react-redux";

export function UploadConfirm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addFile } = useIpfs();
  const { signMessage } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const { fileUrl, tags, title, description, nsfw, fileType, thumb } =
    useUpload();

  const dispatch = useDispatch<any>();
  const onClickUpload = () => {
    setLoading(true);
    addFile(fileUrl).then(({ cid }) => {
      const strCid = cid.toString();
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
            name: title,
            description,
            tags,
            nsfw,
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
    });
  };

  const archiveUpload = () => {
    window.alert(
      "Coming Soon, Please visit www.vinciis.in/monad/how-to for more details"
    );
  };

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
              onClick={() => navigate(`/upload`)}
            />
          </Flex>
          <hr />
          {loading && <HLoading loading={loading} />}
          <SimpleGrid columns={[1, 2]} gap="2">
            <Box p="4" align="center">
              <Stack py="4">
                <MediaContainer fileThumbnail={thumb} fileType={fileType} />
              </Stack>
              <hr />
              <Stack py="4">
                <Text fontSize="" fontWeight="600">
                  Title: {title}{" "}
                </Text>
                <Text py="1" fontSize="sm">
                  Description: {description}{" "}
                </Text>
                {tags && tags.length > 0 ? (
                  <Flex py="2" align="center" justify="space-between">
                    {tags
                      .filter((_tag, _i) => _i < 3)
                      .map((_tag, _i) =>
                        _tag ? (
                          <Box
                            key={_i}
                            rounded="md"
                            px="2"
                            py="1"
                            bgColor="violet.200"
                          >
                            <Text color="black.500">{_tag}</Text>
                          </Box>
                        ) : (
                          <div key={_i}></div>
                        )
                      )}
                    {tags.length > 3 && (
                      <SimpleGrid>
                        <Text>{`${tags.length - 3}+`}</Text>
                      </SimpleGrid>
                    )}
                  </Flex>
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
            <Box p="4">
              <Text py="2" textAlign="center" fontSize="" fontWeight="600">
                Upload Now
              </Text>
              <Text py="1" fontSize="xs">
                Upload your file now for free.
                <br />
                Once enough people look at your content,
                <br />
                you can add it to a permanent archive using attention rewards.
                <br />
                <span
                  className="text-underline mt-10"
                  style={{ color: "#5ED9D1" }}
                >
                  Learn More
                </span>
              </Text>
              <Button
                width="100%"
                variant="outline"
                color="violet.500"
                onClick={onClickUpload}
              >
                Upload
              </Button>
              <hr />
              <Box py="2" align="center">
                <Text p="4" fontSize="sm" fontWeight="600">
                  Already have KOII and AR?
                  <br />
                  <span
                    className="text-underline"
                    style={{ color: "#FCC78F" }}
                    onClick={archiveUpload}
                  >
                    Pay now to archive immediately.
                  </span>
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Stack>
      </Center>
    </Box>
  );
}
