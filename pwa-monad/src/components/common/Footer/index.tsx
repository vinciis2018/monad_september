import React from "react";
import { Link as RouterLink } from "react-router-dom";
// ui

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaDiscord,
  FaMedium,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineBell,
  AiOutlineAim,
  AiOutlineSetting,
  AiOutlineHome,
} from "react-icons/ai";

import { useWindowSize } from "utils";
import Logo from "assets/logo.png";
import Name from "assets/name.png";
import { isPWA } from "utils/util";
import {
  Box,
  Flex,
  Link,
  Image,
  Stack,
  Heading,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";

export function Footer() {
  const { width } = useWindowSize();
  const [pwaMode, setPwaMode] = React.useState(false);

  const style = {
    bgColor: "gray.100",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    zIndex: "10",
  };

  React.useEffect(() => {
    if (isPWA()) {
      setPwaMode(true);
      // console.log("pwaMode", pwaMode);
    }
  }, []);

  return (
    <Box color="black" bg="gray.100">
      {pwaMode || width < 500 ? (
        <Box __css={style}>
          <Flex
            mx="auto"
            maxW="container.lg"
            justify="space-between"
            align="center"
            py="2"
            px="4"
          >
            <span />
            <IconButton
              as={RouterLink}
              to={`/`}
              bg="none"
              icon={<AiOutlineHome size="20px" color="black" />}
              aria-label="Home"
            ></IconButton>
            <IconButton
              as={RouterLink}
              to={`/screens`}
              bg="none"
              icon={<AiOutlineFundProjectionScreen size="20px" color="black" />}
              aria-label="Screens"
            ></IconButton>
            <IconButton
              as={RouterLink}
              to={`/mapbox`}
              bg="none"
              icon={<AiOutlineAim size="20px" color="black" />}
              aria-label="Map"
            ></IconButton>
            <IconButton
              as={RouterLink}
              to={`/pleaBucket`}
              bg="none"
              icon={<AiOutlineBell size="20px" color="black" />}
              aria-label="Pleas"
            ></IconButton>
            <IconButton
              as={RouterLink}
              to={`/setting`}
              bg="none"
              icon={<AiOutlineSetting size="20px" color="black" />}
              aria-label="Settings"
            ></IconButton>
            <span />
          </Flex>
        </Box>
      ) : (
        <Stack
          mx="auto"
          maxW="container.md"
          justify="space-between"
          align="center"
          py="2"
          px="4"
        >
          <Flex
            mx="auto"
            maxW="container.lg"
            justify="space-between"
            align="center"
            py="3"
          >
            <HStack px="10" py="50">
              <Image
                width={{ base: 35, lg: "50px" }}
                src={Logo}
                alt="blinds logo here"
              />
              <Image
                width={{ base: 70, lg: "100px" }}
                src={Name}
                alt="blinds logo here"
              />
            </HStack>
            <Stack mx="auto" justify="space-between" px="10" py="2">
              <Heading fontSize="15px">Contact Us</Heading>
              <Text fontSize="12px">
                Registered Office Address: Vinciis Creations Private Limited, D
                65/319 C, Lahartara, B Shivdaspur, Varanasi, UP, 221002
              </Text>
            </Stack>
          </Flex>
          <Box
            mx="auto"
            maxW="container.lg"
            justifyItems="space-between"
            alignItems="center"
            py="3"
          >
            <HStack mx="auto" justify="" px="10" py="2">
              <Heading fontSize="sm">Important Links: </Heading>
              <Link href="/home" fontSize="sm">
                Team{" "}
              </Link>
              <Link href="/home" fontSize="sm">
                Vinciis
              </Link>
              <Link href="/home" fontSize="sm">
                Monad
              </Link>
              <Link href="/home" fontSize="sm">
                More
              </Link>
            </HStack>
            <HStack mx="auto" justify="" px="10" py="2">
              <Heading fontSize="sm">Demo Links: </Heading>
              <Link
                fontSize="sm"
                href="https://drive.google.com/file/d/1Nvtee-s5zPkCaPOYz29aQOTJJvt2lGIU/view?usp=sharing"
                className="white"
              >
                Controller Card
              </Link>
              <Link
                fontSize="sm"
                href="https://docs.google.com/document/d/1datLSwSXYT7L99IEoc_03c6VArlwlmnSBJuNpi2Wlgc/edit?usp=sharing"
                className="white"
              >
                White Paper*
              </Link>
              <Link
                fontSize="sm"
                href="https://drive.google.com/drive/folders/1sgbuQPIn5nXD39d6z0nOO7mvDm8rhrta?usp=sharing"
                className="white"
              >
                Demo Links
              </Link>
            </HStack>
          </Box>
          <Stack justify="space-between" align="center" px="20" py="2">
            <Text fontSize="12px">
              Write to us <strong>ad@vinciis.in</strong> and/or Call{" "}
              <strong>+917250283664</strong>
            </Text>
            <Text fontSize="xs" textAlign="center">
              Copyright @ VINCIIS CREATIONS PRIVATE LIMITED, 2022. All rights
              reserved.
            </Text>
            <HStack
              width="auto"
              maxW="container.md"
              justify="space-between"
              align="center"
            >
              <IconButton
                onClick={() =>
                  window.location.replace(
                    `https://www.facebook.com/vinciisadtech`
                  )
                }
                bg="none"
                icon={<FaFacebookSquare size="20px" color="black" />}
                aria-label="Vinciis Facebook"
              ></IconButton>
              <span />
              <IconButton
                onClick={() =>
                  window.location.replace(
                    `https://www.instagram.com/vinciis_itself`
                  )
                }
                bg="none"
                icon={<FaInstagramSquare size="20px" color="black" />}
                aria-label="Vinciis Instagram"
              ></IconButton>
              <span />
              <IconButton
                onClick={() =>
                  window.location.replace(`https://discord.gg/rxNUvBh5`)
                }
                bg="none"
                icon={<FaDiscord size="20px" color="black" />}
                aria-label="Vinciis Discord"
              ></IconButton>
              <span />
              <IconButton
                onClick={() =>
                  window.location.replace(`https://twitter.com/vinciis_`)
                }
                bg="none"
                icon={<FaTwitter size="20px" color="black" />}
                aria-label="Vinciis Twitter"
              ></IconButton>
              <span />
              <IconButton
                as={RouterLink}
                to={`/#`}
                bg="none"
                icon={<FaTelegram size="20px" color="black" />}
                aria-label="Vinciis Telegram"
              ></IconButton>
              <span />
              <IconButton
                as={RouterLink}
                to={`/#`}
                bg="none"
                icon={<FaMedium size="20px" color="black" />}
                aria-label="Vinciis Medium"
              ></IconButton>
              <span />
              <IconButton
                onClick={() =>
                  window.location.replace(
                    `https://www.linkedin.com/company/vinciis`
                  )
                }
                bg="none"
                icon={<FaLinkedin size="20px" color="black" />}
                aria-label="Vinciis Linkedin"
              ></IconButton>
              <span />
              <IconButton
                as={RouterLink}
                to={`/#`}
                bg="none"
                icon={<FaWhatsapp size="20px" color="black" />}
                aria-label="Vinciis Whatsapp"
              ></IconButton>
              <span />
              <IconButton
                onClick={() =>
                  window.location.replace(
                    `https://www.youtube.com/channel/UCn0ycOFFkT5T9w8fSVwsHOg/featured`
                  )
                }
                bg="none"
                icon={<FaYoutube size="20px" color="black" />}
                aria-label="Vinciis Youtube"
              ></IconButton>
              <span />
            </HStack>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
