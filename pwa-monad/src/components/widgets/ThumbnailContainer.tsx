import { Box, Image } from "@chakra-ui/react";

const MediaContainer = ({
  fileThumbnail,
  fileType,
}: {
  fileThumbnail: any;
  fileType: any;
}) => {
  return (
    <Box shadow="card" rounded="md">
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
      {fileType === "image/jpeg" && (
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
        <video height="100%" width="100%" autoPlay>
          <source src={fileThumbnail} />
        </video>
      )}
    </Box>
  );
};

export default MediaContainer;
