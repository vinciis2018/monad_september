import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Badge,
  Center,
  Box,
  Flex,
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  IconButton,
  Tooltip,
  Image,
} from "@chakra-ui/react";
// import { isPWA } from "utils/util";
import { editWallet } from "../../../Actions/walletActions";
import { signout } from "../../../Actions/userActions";
import { useLogin, useWallet } from "components/contexts";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { useWindowSize } from "utils";

import {
  AiOutlineFundProjectionScreen,
  AiOutlineSetting,
  AiOutlineWallet,
  AiOutlineAim,
  AiOutlinePicture,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlinePoweroff,
  AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai";

import Logo from "assets/logo.png";
import Name from "assets/name.png";
import { arweave_icon, koii_icon, mona_icon } from "assets/svgs";

export const Nav = () => {
  const { width } = useWindowSize();

  const navigate = useNavigate();

  const style = {
    bgColor: "gray.100",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    position: "fixed",
    left: "0",
    top: "0",
    width: "100%",
    zIndex: "10",
  };
  const [walletBalance, setWalletBalance] = React.useState({
    ar: 0,
    koii: 0,
    ratData: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalOpen, setModalOpen] = React.useState<Boolean>(false);

  const { isUnlocked, lock, getArweavePublicAddress, isLoading } = useWallet();

  const { logout: logoutUser, lock: lockUser } = useLogin();

  const dispatch = useDispatch<any>();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo,
  } = userSignin;

  React.useEffect(() => {
    if (userInfo && getArweavePublicAddress() !== userInfo.defaultWallet) {
      dispatch(editWallet({ walletAdd: getArweavePublicAddress() }));
    }

    if (!isLoading) {
      setModalOpen(false);
      // getBalances(getArweavePublicAddress()).then((res: any) => {
      setWalletBalance(walletBalance);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, isLoading, getArweavePublicAddress, walletBalance]);

  const signoutHandler = () => {
    lockUser();
    logoutUser();
    lock();
    dispatch(signout());
    navigate("/signin");
  };

  const lockWallet = () => {
    lockUser();
    logoutUser();
    lock();
    navigate("/login");
  };

  const onWalletClick = () => {
    if (!userInfo) {
      // navigate("/signin");
    }
  };

  const loginHandler = () => {
    isUnlocked();
  };

  const isModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Box __css={style} bg="white" px="4" color="white" shadow="card">
      {loadingUserInfo ? (
        <HLoading loading={loadingUserInfo} />
      ) : errorUserInfo ? (
        <MessageBox variant="danger">{errorUserInfo}</MessageBox>
      ) : (
        <Box>
          {width < 500 ? (
            <Flex
              mx="auto"
              maxW="container.lg"
              justify="space-between"
              align="center"
              py="3"
            >
              {!userInfo ? (
                <>
                  <Button
                    bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                    as={RouterLink}
                    to={`/signin`}
                    size="sm"
                    fontSize="xs"
                  >
                    Please Signin
                  </Button>
                </>
              ) : (
                <Flex align="center">
                  <Menu>
                    <MenuButton>
                      <Tooltip
                        bg="violet.500"
                        color="white"
                        hasArrow
                        placement="bottom"
                        label="Click for Menu"
                      >
                        <Center
                          as={RouterLink}
                          to="/"
                          bg="gray.100"
                          border="1px solid white"
                          shadow="card"
                          mx="auto"
                          rounded="full"
                          color="blue.100"
                          boxSize="50px"
                          flexBasis="50px"
                          flexShrink="0"
                        >
                          <Image
                            width="100%"
                            rounded="full"
                            src={userInfo?.avatar}
                          />
                        </Center>
                      </Tooltip>
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        as={RouterLink}
                        to={`/mapbox`}
                        color="black"
                        icon={<AiOutlineAim size="20px" />}
                      >
                        Explore
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/screens`}
                        color="black"
                        icon={<AiOutlineFundProjectionScreen size="20px" />}
                      >
                        Screens
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/adverts`}
                        color="black"
                        icon={<AiOutlinePicture size="20px" />}
                      >
                        Adverts
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/pleaBucket`}
                        color="black"
                        icon={<AiOutlineBell size="20px" />}
                      >
                        Notifications
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/userProfile/${
                          userInfo._id
                        }/${getArweavePublicAddress()}`}
                        color="black"
                        icon={<AiOutlineUser size="20px" />}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/wallet/${userInfo._id}/${userInfo.defaultWallet}`}
                        color="black"
                        icon={<AiOutlineWallet size="20px" />}
                      >
                        Wallet
                      </MenuItem>
                      {/* <MenuItem as={RouterLink} to={`/upload-camera`} color="black" icon={<AiOutlineCamera size="20px" />}>
                        Camera
                      </MenuItem> */}
                      <MenuItem
                        as={RouterLink}
                        to={`/setting`}
                        color="black"
                        icon={<AiOutlineSetting size="20px" />}
                      >
                        Settings
                      </MenuItem>
                      <MenuItem
                        onClick={lockWallet}
                        color="black"
                        icon={<AiOutlinePoweroff size="20px" />}
                      >
                        Disconnect
                      </MenuItem>
                      <MenuItem
                        onClick={signoutHandler}
                        color="black"
                        icon={<AiOutlineLogout size="20px" />}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  {!isLoading ? (
                    <Badge
                      onClick={isModalOpen}
                      borderRadius="full"
                      px="4"
                      py="2"
                      variant="outline"
                      colorScheme="black"
                    >
                      <Flex align="center" justify="space-between">
                        <Text lineHeight="1" p="1">
                          {getArweavePublicAddress()
                            ? walletBalance?.ar +
                              walletBalance?.koii +
                              walletBalance?.ratData
                            : "wallet locked"}
                        </Text>
                        <AiOutlineWallet size="15px" color="black" />
                      </Flex>
                    </Badge>
                  ) : (
                    <IconButton
                      onClick={onWalletClick}
                      aria-label="Connect"
                      bg={isLoading ? "red.200" : "red.500"}
                      icon={<AiOutlineWallet color="black" size="20px" />}
                    />
                  )}
                </Flex>
              )}
              <IconButton
                as={RouterLink}
                to={`/artist/${getArweavePublicAddress()}`}
                icon={<AiOutlineSearch size="20px" color="black" />}
                aria-label="search-what-you-are-looking-for"
                bg="none"
                rounded="sm"
                h="33px"
              />
            </Flex>
          ) : (
            <Flex
              mx="auto"
              maxW="container.lg"
              justify="space-between"
              align="center"
              py="3"
            >
              <Stack as={RouterLink} to="/" direction="row" align="center">
                <Image width={{ base: 30, lg: "50px" }} src={Logo} />
                <Image width={{ base: 70, lg: "100px" }} src={Name} />
              </Stack>
              {!userInfo ? (
                <Button
                  bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                  as={RouterLink}
                  to={`/signin`}
                  size="sm"
                  fontSize="xs"
                >
                  Please Signin
                </Button>
              ) : (
                <Stack direction="row" align="center" spacing="1">
                  {/* <IconButton as={RouterLink} to={`/artist/${getArweavePublicAddress()}`} icon={<RiSearch2Line size="20px" color="black" />} aria-label="search-what-you-are-looking-for" bg="none" rounded="md" h="33px" /> */}
                  <Center
                    onClick={onOpen}
                    bg="gray.100"
                    border="1px solid white"
                    shadow="card"
                    mx="auto"
                    rounded="full"
                    color="blue.100"
                    boxSize="50px"
                    flexBasis="50px"
                    flexShrink="0"
                  >
                    <Image width="100%" rounded="full" src={userInfo?.avatar} />
                  </Center>
                  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerHeader alignItems="center" borderBottomWidth="1px">
                        <Center
                          onClick={onOpen}
                          bg="gray.100"
                          border="1px solid white"
                          shadow="card"
                          mx="auto"
                          rounded="full"
                        >
                          <Image
                            width="100%"
                            rounded="full"
                            src={userInfo?.avatar}
                          />
                        </Center>
                        <Text fontSize="sm">
                          Hey {userInfo?.name}, here is your menu...
                        </Text>
                      </DrawerHeader>
                      <DrawerBody p="1">
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/mapbox`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineAim size="20px" />
                          <Text p="2" fontWeight="600">
                            Explore
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/screens`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineFundProjectionScreen size="20px" />
                          <Text p="2" fontWeight="600">
                            Screens
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/adverts`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlinePicture size="20px" />
                          <Text p="2" fontWeight="600">
                            Adverts
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/pleaBucket`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineBell size="20px" />
                          <Text p="2" fontWeight="600">
                            Notifications
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/userProfile/${userInfo._id}/${userInfo.defaultWallet}`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineUser size="20px" />
                          <Text p="2" fontWeight="600">
                            Profile
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/wallet/${
                            userInfo._id
                          }/${getArweavePublicAddress()}`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineWallet size="20px" />
                          <Text p="2" fontWeight="600">
                            Wallet
                          </Text>
                        </Flex>
                        {/* <Flex p="2" as={RouterLink} to={`/upload-camera`} align="center" shadow="card" rounded="lg">
                          <AiOutlineCamera size="20px" />
                          <Text p="2" fontWeight="600">Camera</Text>
                        </Flex> */}
                        <Flex
                          p="2"
                          as={RouterLink}
                          to={`/setting`}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineSetting size="20px" />
                          <Text p="2" fontWeight="600">
                            Settings
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          onClick={lockWallet}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlinePoweroff size="20px" />
                          <Text p="2" fontWeight="600">
                            Disconnect
                          </Text>
                        </Flex>
                        <Flex
                          p="2"
                          onClick={signoutHandler}
                          align="center"
                          shadow="card"
                          rounded="lg"
                        >
                          <AiOutlineLogout size="20px" />
                          <Text p="2" fontWeight="600">
                            LogOut
                          </Text>
                        </Flex>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                  {!isLoading ? (
                    <Badge variant="outline" colorScheme="black" rounded="full">
                      <Menu>
                        <MenuButton onClick={isModalOpen}>
                          <Tooltip
                            bg="violet.500"
                            color="white"
                            hasArrow
                            placement="bottom"
                            label="Click for Menu"
                          >
                            <Text p="2" lineHeight="1" fontWeight="600">
                              AD Credits:{" "}
                              {getArweavePublicAddress()
                                ? walletBalance?.ar +
                                  walletBalance?.koii +
                                  walletBalance?.ratData
                                : "wallet locked"}
                            </Text>
                          </Tooltip>
                        </MenuButton>
                        <MenuList>
                          <MenuItem>
                            <Box alignItems="center" p="2">
                              <Text fontSize="sm" fontWeight="600">
                                AD Credits = RAT + AR + KOII
                              </Text>
                              <Text fontSize="10px">
                                You need AD Credits for interaction with our
                                platform.
                              </Text>
                              <Text fontSize="10px">
                                For more details on AD Credits, please read out
                                white paper, or contact us.
                              </Text>
                            </Box>
                          </MenuItem>
                          <MenuItem color="black" alignItems="center">
                            <Stack
                              direction="row"
                              align="center"
                              justify="space-between"
                            >
                              <Stack
                                align="left"
                                direction="row"
                                spacing="4"
                                cursor="pointer"
                                px="2"
                                py="1"
                                rounded="full"
                                fontSize="sm"
                                fontWeight="600"
                              >
                                <Stack direction="row" align="center">
                                  <img src={mona_icon} alt="arweave" />
                                  {/* <RatIcon color="black" boxSize="20px" /> */}
                                  <Text fontSize="xs" lineHeight="1">
                                    {walletBalance?.ratData?.toFixed?.(3)}
                                  </Text>
                                </Stack>
                                <Stack direction="row" align="center">
                                  <img src={koii_icon} alt="arweave" />
                                  {/* <KoiiIcon color="black" boxSize="22px" /> */}
                                  <Text fontSize="xs" lineHeight="1">
                                    {walletBalance?.koii?.toFixed?.(2)}
                                  </Text>
                                </Stack>
                                <Stack direction="row" align="center">
                                  <img src={arweave_icon} alt="arweave" />
                                  {/* <ArweaveIcon color="black" boxSize="20px" /> */}
                                  <Text fontSize="xs" lineHeight="1">
                                    {walletBalance?.ar?.toFixed?.(3)}
                                  </Text>
                                </Stack>
                              </Stack>
                            </Stack>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Badge>
                  ) : (
                    <IconButton
                      onClick={loginHandler}
                      aria-label=""
                      bg={isLoading ? "red.200" : "red.500"}
                      icon={<AiOutlineWallet color="black" size="20px" />}
                    />
                  )}
                </Stack>
              )}
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};
