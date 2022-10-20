// ui
import { Box, Image } from "@chakra-ui/react";
// utils
import { getMediaType, triggerPort } from "services/utils";

export const MediaContainer = ({ media }: any) => {
  // console.log(media);
  const contentType = getMediaType(media?.headers["content-type"]);
  const ipfsUrl = media?.request["responseURL"];
  // const ipfsUrl = nft;

  // console.log(ipfsUrl);
  // console.log(arweaveUrl);
  const IframeContainer = () => (
    <Box
      as="iframe"
      src={ipfsUrl}
      onLoad={() =>
        triggerPort(media.request["responseURL"].split("/").slice()[4])
      }
      boxSize="100%"
    />
  );
  const ImageContainer = () => (
    <Image
      src={ipfsUrl}
      onLoad={() =>
        triggerPort(media.request["responseURL"].split("/").slice()[4])
      }
      boxSize="100%"
      objectFit="cover"
    />
  );
  const VideoContainer = () => (
    <Box
      as="video"
      autoPlay
      loop
      controls
      muted
      onLoadedData={() =>
        triggerPort(media.request["responseURL"].split("/").slice()[4])
      }
      boxSize="100%"
    >
      <source src={ipfsUrl} />
    </Box>
  );

  const renderContainer = () => {
    switch (contentType) {
      case "image":
        return <ImageContainer />;
      case "video":
        return <VideoContainer />;
      case "iframe":
        return <IframeContainer />;
      default:
        return <></>;
    }
  };
  return (
    <Box rounded="xl" height="360px" overflow="hidden">
      {renderContainer()}
    </Box>
  );
};
