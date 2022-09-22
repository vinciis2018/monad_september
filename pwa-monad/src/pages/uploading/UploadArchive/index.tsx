/* eslint-disable no-console */
import { useState } from "react";
// hooks
import { useUpload } from "components/contexts";

import { getFormattedDateFromTimestamp } from "utils/util";
import {
  Stack,
  Box,
  Button,
  Text,
  SimpleGrid,
  Center,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function UploadArchive() {
  const navigate = useNavigate();
  // hooks
  const [err, setErr] = useState("");

  const { fileUrl, tags, title, description, releaseDate } = useUpload();

  const onClickArchive = () => {
    setErr("coming soon");
    setTimeout(() => {
      setErr("");
    }, 3000);
    // navigate("/upload-success");
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
          <Box>
            <Image src={fileUrl} alt="icon" width={"auto"} height={111} />
            <hr />
            <Text sx={{ fontWeight: 600, textAlign: "center" }}>{title}</Text>
            <Text align="center" sx={{ marginBottom: "21px" }}>
              {description}
            </Text>
            {tags && tags.length > 0 ? (
              <SimpleGrid
                container
                rowSpacing="10px"
                columnSpacing="9px"
                justifyContent="center"
              >
                {tags
                  .filter((_tag, _i) => _i < 3)
                  .map((_tag, _i) =>
                    _tag ? (
                      <SimpleGrid item key={_i}>
                        <Text>{_tag}</Text>
                      </SimpleGrid>
                    ) : (
                      <div key={_i}></div>
                    )
                  )}
                {tags.length > 3 && (
                  <SimpleGrid item>
                    <Text>{`${tags.length - 3}+`}</Text>
                  </SimpleGrid>
                )}
              </SimpleGrid>
            ) : (
              <></>
            )}
            <div className="text-center">
              <Text
                color="secondary.main"
                sx={{ color: "#9BE7C4" }}
                className="mt-20"
              >
                Will be published on{" "}
                {getFormattedDateFromTimestamp(
                  "MMMM D, YYYY",
                  releaseDate as number
                )}
              </Text>
              <hr />
              <Text sx={{ marginBottom: "14px" }}>
                Archive Content. Permanently
              </Text>
              <Text
                align="center"
                sx={{ lineHeight: "16px", fontWeight: "400" }}
              >
                Any files registered to Arweave using can never
                <br />
                be removed or censored.
                <br />
                <div className="mt-10">
                  <Text
                    color="secondary.main"
                    sx={{
                      color: "#5ED9D1",
                      marginTop: "23px",
                      fontWeight: 600,
                    }}
                  >
                    Estimated Costs:
                  </Text>
                  <Text>1 KOII</Text>
                  <Text>0.0005 AR</Text>
                  <Text sx={{ color: "#5ED9D1" }}>Storage Fee</Text>
                </div>
              </Text>
            </div>
            <div className="lbl-warning2 mt-15">
              {err !== "" ? err : <span>&nbsp;</span>}
            </div>
            <Button
              width="100%"
              variant="outline"
              color="violet.500"
              onClick={onClickArchive}
            >
              Archive
            </Button>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
