import { memo } from "react";
import { motion } from "framer-motion";
// api
import { useMedia } from "hooks";
// ui
import { Flex, Box, Stack, Skeleton } from "@chakra-ui/react";
// assets
import { ThumbnailContainer } from "../NftFeaturedCard";

export const ThumbnailCard = memo<any>(
  ({ nft }: any) => {
    const MotionFlex = motion(Flex);
    const { isLoading } = useMedia({ id: nft?.cid });
    // console.log(item);
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
          rounded="md"
          shadow="card"
          whileHover={{
            translateY: -3,
          }}
          pos="relative"
          zIndex="1"
        >
          {/* Thumbnail */}
          <Box justify="center" align="center">
            <ThumbnailContainer nft={nft} />
          </Box>
        </MotionFlex>
      </>
    );
  },
  (prev, next) => {
    return prev.nft?.id === next.nft?.id;
  }
);
