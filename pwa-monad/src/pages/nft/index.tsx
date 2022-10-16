import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
// api
// utils
// import {
//   formatDigitNumber,
//   formatUnixTimestamp,
//   triggerPort,
// } from "services/utils";
// ui
import {
  Box,
  Center,
  SimpleGrid,
  Heading,
  Text,
  Stack,
  // Link,
  Button,
  // Wrap,
  // WrapItem,
  // Badge,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  IconButtonProps,
  Image,
  // useDisclosure,
} from "@chakra-ui/react";
import { MediaContainer } from "components/common";
// icons
// import { RiExternalLinkLine } from "react-icons/ri";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";
import { motion } from "framer-motion";

// import { RiFlagFill } from "react-icons/ri";
import { useMedia } from "hooks";

export function NFT() {
  const txId = window.location.href.split("/").slice()[4];
  // const {
  //   isOpen: isReportModalOpen,
  //   onOpen: openReportModal,
  //   onClose: closeReportModal,
  // } = useDisclosure();

  /* Get nft based on url params */
  // const { data: nft, isLoading, isError } = useNft({ id: match?.params?.id });
  const { data: media, isLoading, isError } = useMedia({ id: txId });

  /* on Error */
  if (isError)
    return (
      <NftWrapper>
        <Center>
          <Alert
            status="error"
            variant="left-accent"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops!
            </AlertTitle>
            <AlertDescription maxWidth="sm" mb="2">
              This NFT either does not exists or not registered yet.
            </AlertDescription>
            <Button as={RouterLink} to="/">
              Go to leaderboard
            </Button>
          </Alert>
        </Center>
      </NftWrapper>
    );
  return (
    <NftWrapper>
      {isLoading && (
        <Center h="300px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Center>
      )}
      {/* {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={closeReportModal}
          nftId={media?.id}
          nftTitle={media?.title}
        />
      )} */}

      {!isLoading && (
        <Box w="100%" pos="relative">
          {/* Details */}
          <SimpleGrid
            columns={[1, null, 2]}
            gap={{ base: "4", lg: "8" }}
            w="100%"
          >
            {/* Media Container */}
            <Center
              maxH={{ base: "100%", lg: "100%" }}
              rounded="md"
              shadow="card"
              w="100%"
              h="100%"
              pos="relative"
              overflow="hidden"
              p="2"
            >
              {!media ? (
                <Image src={`https://ipfs.io/ipfs/${txId}`} />
              ) : (
                <MediaContainer media={media} />
              )}
            </Center>
            <Box
              d="flex"
              flexDir="column"
              rounded="md"
              shadow="card"
              w="100%"
              h="100%"
              pos="relative"
              overflow="hidden"
              p={{ base: "4", lg: "6" }}
            >
              {/* Title */}
              <Heading as="h2" size="lg" noOfLines={2} color="">
                {/* {media?.title} */}
                Media not uploaded as an NFT...
              </Heading>
              <Text fontSize="md">
                please contact moderators for more details
              </Text>
              {/* Owner */}
              {/* <Link
                as={RouterLink}
                to={`/artist/${media?.owner}`}
                color="gray.400"
                fontSize="xs"
                noOfLines={1}
                mt="1px"
              >
                {media?.name}
              </Link> */}

              {/* <Stack direction="row" align="center" mt="2">
                <Text color="violet.500" fontSize="sm">
                  <Text as="span" d={{ base: "none", lg: "inline" }}>
                    Registered:
                  </Text>{" "}
                  <span>
                    {formatUnixTimestamp(media?.createdAt || "1616944045")}
                  </span>
                </Text>
                <Button
                  as={Link}
                  variant="ghost"
                  colorScheme=""
                  href={`https://viewblock.io/arweave/tx/${media?.id}`}
                  isExternal
                  rel="noopener noreferrer"
                  size="xs"
                  rightIcon={<RiExternalLinkLine />}
                >
                  Explore block
                </Button>
                <RiFlagFill
                  color="red"
                  aria-label="tip"
                  children="Report"
                  onClick={openReportModal}
                />
              </Stack> */}

              {/* Description */}
              {/* <Text
                noOfLines={4}
                mt="3"
                fontSize="sm"
                lineHeight="short"
                mb={media?.tags?.length > 0 ? "0" : "3"}
              >
                {media?.description}
              </Text> */}
              {/* Tags */}
              {/* {media?.tags?.length > 0 && (
                <Wrap spacing="8px" mt="3" mb="3">
                  {media?.tags?.map((tag: string) => (
                    <WrapItem key={tag}>
                      <Badge colorScheme="blue">{tag}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              )} */}
              {/* Stats */}
              <Stack direction="row" align="center" mt="auto" mb="4">
                <Text color="violet.500" fontWeight="600">
                  {/* {media?.attention} Views */}
                </Text>
                <Stack direction="row" align="center">
                  {/* <KoiiIcon boxSize="25px" /> */}
                  <Text fontWeight="600">
                    {/* {formatDigitNumber(media?.reward)} Koii earned */}
                  </Text>
                </Stack>
              </Stack>
              {/* Footbar */}
              {/* <NftFootbar rounded="md" nft={nft} /> */}
            </Box>
            {/* Info Container */}
          </SimpleGrid>
        </Box>
      )}
    </NftWrapper>
  );
}

interface NftWrapperProps {
  children: ReactNode;
}
const NftWrapper = ({ children }: NftWrapperProps) => {
  return (
    <Box
      pt="40"
      px="4"
      color="blue.500"
      bg="white"
      w="100%"
      h={{ base: "unset", lg: "calc(100vh - 105px)" }}
      minH={{ base: "calc(100vh - 105px)" }}
    >
      <Center w="100%" maxW="1040px" h="100%" mx="auto">
        {children}
      </Center>
    </Box>
  );
};

interface NavigationButtonProps extends IconButtonProps {
  isNext: boolean;
  href: string;
}

const NavigationButton = ({
  isNext,
  href,
  ...restProps
}: NavigationButtonProps) => {
  const MotionIconButton = motion(IconButton);
  const leftTransition = {
    base: isNext ? "unset" : "-15px",
    lg: isNext ? "unset" : "-35px",
  };
  const rightTransition = {
    base: isNext ? "-15px" : "unset",
    lg: isNext ? "-35px" : "unset",
  };
  return (
    <MotionIconButton
      fontSize={{ base: "20px", lg: "25px" }}
      icon={isNext ? <ImArrowRight2 /> : <ImArrowLeft2 />}
      style={{ translateY: "50%" }}
      transition={{ duration: 0.1 }}
      whileHover={{
        translateX: isNext ? 4 : -4,
      }}
      as={RouterLink}
      to={href}
      variant="ghost"
      pos="absolute"
      top="50%"
      left={leftTransition}
      right={rightTransition}
      transform="translate(0%,-50%)"
      zIndex="2"
      {...restProps}
    />
  );
};
