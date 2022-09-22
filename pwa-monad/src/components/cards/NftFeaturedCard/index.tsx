import { Link as RouterLink } from "react-router-dom";
import { useState, memo } from "react";
import { motion } from "framer-motion";
// api
import { useMedia } from "hooks";
// ui
import {
  Flex,
  Link,
  Image,
  // Text,
  Center,
  Spinner,
  Box,
  Stack,
  // ButtonGroup,
  // Button,
  Skeleton,
  // useDisclosure,
} from "@chakra-ui/react";
import { getMediaType } from "services/utils";
// import { ReportModal, ShareModal } from "components/modals";
// assets
import fallbackImage from "assets/fallback.png";

export const NftFeaturedCard = memo<any>(
  ({ nft }: any) => {
    const MotionFlex = motion(Flex);
    const { data: item, isLoading } = useMedia({ id: nft?.id });
    // console.log(nft);
    return (
      <>
        {isLoading && (
          <Stack w="100%" spacing="4">
            <Skeleton h="200px" w="100%" />
            <div>
              <Skeleton h="50px" w="100%" mb="2" />
              <Skeleton h="50px" w="100%" />
            </div>
          </Stack>
        )}
        <MotionFlex
          flexDir="column"
          w="100%"
          role="group"
          rounded="lg"
          shadow="card"
          whileHover={{
            translateY: -3,
          }}
          pos="relative"
          zIndex="1"
        >
          <Link
            as={RouterLink}
            to={`/nft/${nft?.id}`}
            pos="absolute"
            w="100%"
            h="100%"
            top="0"
            left="0"
            zIndex="2"
            rounded="md"
          />
          <Box justify="center" align="center">
            <ThumbnailContainer nft={item} />
          </Box>
        </MotionFlex>
      </>
    );
  },
  (prev, next) => {
    return prev.nft?.id === next.nft?.id;
  }
);

/* Thumbnail */
export const ThumbnailContainer = ({ nft }: any) => {
  const [isFailed, setIsFailed] = useState(false);
  const onError = () => {
    setIsFailed(true);
  };
  const { data: media } = useMedia({ id: nft.cid });
  const contentType = getMediaType(media?.headers["content-type"]);
  return (
    <Box height="200px">
      {contentType === "image" ? (
        <Image
          /*  fallback to arweave iframe if the thumbnail not generated yet on Koii side */
          src={
            isFailed
              ? `https://ipfs.io/ipfs/${nft?.cid}`
              : `https://koii.live/${nft?.cid}.png`
          }
          fallback={<ThumbnailLoading />}
          fallbackSrc={fallbackImage}
          onError={onError}
          h="200px"
          alt={nft?.title}
          objectFit="cover"
          // bg="gray.200"
          w="100%"
          rounded="md"
        />
      ) : (
        <Box
          as="video"
          muted
          // onLoadedData={() =>
          //   triggerPort(media.request["responseURL"].split("/").slice()[4])
          // }
          boxSize="100%"
        >
          <source src={`https://ipfs.io/ipfs/${nft?.cid}`} />
        </Box>
      )}
    </Box>
  );
};

function ThumbnailLoading() {
  return (
    <Center h="200px" bg="gray.100" w="100%">
      <Spinner
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="md"
      />
    </Center>
  );
}
