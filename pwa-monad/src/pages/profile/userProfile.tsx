import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Image,
  FormControl,
  Select,
  FormLabel,
  Input,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Button,
  IconButton,
  Center,
} from "@chakra-ui/react";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineArrowLeft,
  AiOutlineEdit,
  AiOutlineNotification,
  AiOutlineTags,
  AiOutlineRightCircle,
  AiOutlineUpload,
  AiOutlinePartition,
} from "react-icons/ai";

import { detailsUser, updateUserProfile } from "../../Actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../Constants/userConstants";

import { CopyableAddress } from "components/ui";
import { ThumbnailCard } from "components/cards";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { getMyMedia } from "Actions/mediaActions";

export function UserProfile(props: any) {
  const navigate = useNavigate();

  const [name, setName] = React.useState<any>("");
  const [avatar, setAvatar] = React.useState<any>("");
  const [phone, setPhone] = React.useState<any>("");
  const [email, setEmail] = React.useState<any>("");

  const [address, setAddress] = React.useState<any>("");
  const [districtCity, setDistrictCity] = React.useState<any>("");
  const [stateUt, setStateUt] = React.useState<any>("");
  const [country, setCountry] = React.useState<any>("");
  const [pincode, setPincode] = React.useState<any>("");

  const [profileModal, setProfileModal] = React.useState<boolean>(false);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  const userUpdateProfile = useSelector(
    (state: any) => state.userUpdateProfile
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;

  const myMedia = useSelector((state: any) => state.myMedia);
  const { loading: loadingMyMedia, error: errorMyMedia, medias } = myMedia;

  const redirect = props?.location?.search
    ? props?.location?.search.split("=")[1]
    : "/signin";

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (successUpdate) {
      window.alert("Profile updated successfully");
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
    }

    if (!user) {
      dispatch(
        detailsUser({
          userId: userInfo?._id,
          walletAddress: userInfo.defaultWallet,
        })
      );
    } else {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setPhone(user?.user?.phone);
      setAvatar(user?.user?.avatar);
      setAddress(user?.user?.address);
      setDistrictCity(user?.user?.districtCity);
      setStateUt(user?.user?.stateUt);
      setCountry(user?.user?.country);
      setPincode(user?.user?.pincode);
    }

    if (!userInfo) {
      navigate(redirect);
    } else {
      dispatch(getMyMedia());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, user, successUpdate, navigate, redirect, avatar]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        userId: userInfo._id,
        name,
        avatar,
        phone,
        email,
        address,
        districtCity,
        stateUt,
        country,
        pincode,
      })
    );
    setProfileModal(false);
    setAddressModal(false);
  };

  const userProfileEditOpen = () => {
    setAddressModal(false);
    setProfileModal(!profileModal);
  };

  const userAddressEditOpen = () => {
    setProfileModal(false);
    setAddressModal(!addressModal);
  };

  return (
    <Box px="2" pt="20" color="black.500">
      {/* Container */}
      <Box maxW="container.lg" mx="auto" pb="8">
        <Center maxW="container.lg" mx="auto" pb="8">
          <Stack p="2">
            <Stack align="center" p="2" direction="row" justify="space-between">
              <AiOutlineArrowLeft onClick={() => navigate(-1)} />
              <Text fontWeight="600">User Profile</Text>
              {userInfo.isItanimulli ? (
                <AiOutlinePartition
                  onClick={() => navigate(`/customCreation/admin`)}
                />
              ) : (
                <AiOutlinePartition color="white" />
              )}
            </Stack>
            {loadingDetails || loadingMyMedia || loadingUpdate ? (
              <HLoading
                loading={loadingDetails || loadingMyMedia || loadingUpdate}
              />
            ) : errorDetails || errorMyMedia || errorUpdate ? (
              <MessageBox variant="danger">
                {errorDetails || errorMyMedia || errorUpdate}
              </MessageBox>
            ) : (
              <Stack p="2">
                {profileModal ? (
                  <Box m="" p="2" rounded="lg" shadow="card">
                    <Text align="center" fontWeight="600" p="2" fontSize="md">
                      Edit Profile
                    </Text>
                    <Flex align="" justify="space-between">
                      <Box p="2" align="center" width="">
                        <Image
                          p="2"
                          border="1px"
                          borderColor="gray.100"
                          rounded="full"
                          height="100px"
                          src={avatar}
                        />
                      </Box>
                      <Box width="75%">
                        <FormControl p="2" id="name">
                          <Stack direction="row" align="center">
                            <Input
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                              placeholder={name}
                              value={name}
                              type="text"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your name here...
                          </FormLabel>
                        </FormControl>
                        <FormControl p="2" id="phone">
                          <Stack direction="row" align="center">
                            <Input
                              id="phone"
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={phone}
                              value={phone}
                              type="phone"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your contact number here...
                          </FormLabel>
                        </FormControl>
                        <FormControl p="2" id="email">
                          <Stack direction="row" align="center">
                            <Input
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={email}
                              value={email}
                              type="email"
                            />
                          </Stack>
                          <FormLabel px="1" fontSize="xs">
                            Change your email here...
                          </FormLabel>
                        </FormControl>

                        <FormControl p="2" id="avatar">
                          <Select
                            id="avatar"
                            placeholder={avatar}
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                          >
                            {medias?.map((nft: Record<string, any>) => (
                              <option
                                style={{ color: "black" }}
                                key={nft?.id}
                                value={`https://ipfs.io/ipfs/${nft?.cid}`}
                              >
                                https://ipfs.io/ipfs/{nft?.cid}
                              </option>
                            ))}
                          </Select>
                          <FormLabel px="1" htmlFor="avatar" fontSize="xs">
                            This is your profile pic...
                          </FormLabel>
                        </FormControl>
                      </Box>
                    </Flex>
                    <SimpleGrid p="2" gap="4" columns={[2]}>
                      <Button
                        onClick={submitHandler}
                        bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setProfileModal(false)}
                        bgColor="white"
                        color="violet.500"
                        border="1px"
                        borderColor="violet.500"
                      >
                        Go back
                      </Button>
                    </SimpleGrid>
                  </Box>
                ) : (
                  <Box m="" p="2" rounded="lg" shadow="card">
                    <Flex px="2" align="center" justify="space-between">
                      <Box align="left" width="25%">
                        <Image
                          p="2"
                          border="1px"
                          borderColor="gray.100"
                          rounded="full"
                          height="100px"
                          src={user?.user?.avatar}
                          // onLoad={() =>
                          //   triggerPort(user?.user?.avatar.split("/").slice(-1)[0])
                          // }
                        />
                      </Box>
                      <Flex width="75%" justify="space-between">
                        <Box>
                          <Text px="2" fontWeight="600" fontSize="lg">
                            {user?.user?.name}
                          </Text>
                          <Text px="2" fontWeight="" fontSize="xs">
                            {user?.user?.phone}{" "}
                          </Text>
                          <Text px="2" fontWeight="" fontSize="xs">
                            {user?.user?.email}
                          </Text>
                          <CopyableAddress
                            address={userInfo.defaultWallet}
                            w="100%"
                            maxW="200px"
                          />
                        </Box>
                        <IconButton
                          onClick={userProfileEditOpen}
                          bg="none"
                          icon={<AiOutlineEdit size="20px" color="black" />}
                          aria-label="Edit user details"
                        ></IconButton>
                      </Flex>
                    </Flex>
                    <Flex py="2" align="center" justify="space-between"></Flex>
                  </Box>
                )}
                <Flex p="2" align="center" justify="space-between">
                  <Flex
                    onClick={() =>
                      navigate(`/dashboard/user/${userInfo.defaultWallet}`)
                    }
                    bgColor={userInfo.isMaster ? "violet.600" : "gray.200"}
                    rounded="lg"
                    height="30px"
                    p="2"
                    align="center"
                    justify="space-between"
                  >
                    <AiOutlineFundProjectionScreen />
                    <Text
                      p="2"
                      fontSize="xs"
                      fontWeight={userInfo.isMaster ? "600" : ""}
                    >
                      Master
                    </Text>
                  </Flex>
                  <Flex
                    onClick={() =>
                      navigate(`/dashboard/user/${userInfo.defaultWallet}`)
                    }
                    bgColor={userInfo.isAlly ? "violet.600" : "gray.200"}
                    rounded="lg"
                    height="30px"
                    p="2"
                    align="center"
                    justify="space-between"
                  >
                    <AiOutlineNotification />
                    <Text
                      p="2"
                      fontSize="xs"
                      fontWeight={userInfo.isAlly ? "600" : ""}
                    >
                      Ally
                    </Text>
                  </Flex>
                  <Flex
                    onClick={() =>
                      navigate(`/dashboard/user/${userInfo.defaultWallet}`)
                    }
                    bgColor={userInfo.isBrand ? "violet.600" : "gray.200"}
                    rounded="lg"
                    height="30px"
                    p="2"
                    align="center"
                    justify="space-between"
                  >
                    <AiOutlineTags />
                    <Text
                      p="2"
                      fontSize="xs"
                      fontWeight={userInfo.isBrand ? "600" : ""}
                    >
                      Brand
                    </Text>
                  </Flex>
                </Flex>
                {addressModal ? (
                  <Box m="" p="2" rounded="lg" shadow="card">
                    <Text align="center" fontWeight="600" p="2" fontSize="md">
                      Edit Profile
                    </Text>
                    <Box width="">
                      <FormControl p="2" id="address">
                        <Stack direction="row" align="center">
                          <Input
                            id="address"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={address}
                            value={address}
                            type="text"
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">
                          Your house/building/complex details
                        </FormLabel>
                      </FormControl>
                      <FormControl p="2" id="districtCity">
                        <Stack direction="row" align="center">
                          <Input
                            id="districtCity"
                            onChange={(e) => setDistrictCity(e.target.value)}
                            placeholder={districtCity}
                            value={districtCity}
                            type="text"
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">
                          Your city or nearest district
                        </FormLabel>
                      </FormControl>
                      <FormControl p="2" id="stateUt">
                        <Stack direction="row" align="center">
                          <Input
                            id="stateUt"
                            onChange={(e) => setStateUt(e.target.value)}
                            placeholder={stateUt}
                            value={stateUt}
                            type="text"
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">
                          Your current state
                        </FormLabel>
                      </FormControl>
                      <FormControl p="2" id="country">
                        <Stack direction="row" align="center">
                          <Input
                            id="country"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder={country}
                            value={country}
                            type="text"
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">
                          And your nation here
                        </FormLabel>
                      </FormControl>
                      <FormControl p="2" id="pincode">
                        <Stack direction="row" align="center">
                          <Input
                            id="pincode"
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder={pincode}
                            value={pincode}
                            type="text"
                          />
                        </Stack>
                        <FormLabel px="1" fontSize="xs">
                          Your Postal Zip Code
                        </FormLabel>
                      </FormControl>
                    </Box>
                    <SimpleGrid p="2" gap="4" columns={[2]}>
                      <Button
                        onClick={submitHandler}
                        bgGradient="linear-gradient(to left, #BC78EC, #7833B6)"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => setAddressModal(false)}
                        bgColor="white"
                        color="violet.500"
                        border="1px"
                        borderColor="violet.500"
                      >
                        Go back
                      </Button>
                    </SimpleGrid>
                  </Box>
                ) : (
                  <Box m="" p="2" shadow="card" rounded="md">
                    <Flex px="2" align="center" justify="space-between">
                      <Text fontSize="lg" fontWeight="600">
                        Address
                      </Text>
                      <IconButton
                        onClick={userAddressEditOpen}
                        bg="none"
                        icon={<AiOutlineEdit size="20px" color="black" />}
                        aria-label="Edit user details"
                      ></IconButton>
                    </Flex>
                    <Text p="2" fontSize="sm">
                      {user?.user?.address}, {user?.user?.districtCity},{" "}
                      {user?.user?.stateUt}, {user?.user?.country}, Pincode-
                      {user?.user?.pincode}{" "}
                    </Text>
                  </Box>
                )}

                <Box p="">
                  <Flex p="2" align="center" justify="space-between">
                    <Text fontSize="lg" fontWeight="600">
                      Wallet
                    </Text>
                    <IconButton
                      onClick={() =>
                        navigate(`/wallet/${userInfo.defaultWallet}`)
                      }
                      bg="none"
                      icon={<AiOutlineRightCircle size="20px" color="black" />}
                      aria-label="Edit user details"
                    ></IconButton>
                  </Flex>
                  <Stack>
                    {/* {user?.user?.wallets?.map((wallet: any) => {
                      return ( */}
                    <Box
                      onClick={() =>
                        navigate(`/wallet/${userInfo.defaultWallet}`)
                      }
                      p="2"
                      shadow="card"
                      rounded="ld"
                    >
                      <Text p="2" fontSize="xs">
                        Wallet Address: {userInfo.defaultWallet}
                      </Text>
                    </Box>
                    {/* );
                  })} */}
                  </Stack>
                </Box>
                <Button
                  color="violet.500"
                  variant="outline"
                  onClick={() => navigate("/upload")}
                >
                  Upload Content
                </Button>
                <Text fontSize="xs">
                  It may take a while for your newly uploaded media to seed
                </Text>
                <Text fontSize="xs">
                  Please be patient, it takes time only for the first time
                </Text>
                <SimpleGrid
                  p="2"
                  w="100%"
                  minW="0"
                  minH="0"
                  gap="2"
                  columns={[2, 4]}
                >
                  {medias.map((media: any, index: number) => (
                    <Box
                      align="center"
                      p=""
                      key={index}
                      rounded="md"
                      shadow="card"
                      onClick={() => navigate(`/nft/${media.cid}`)}
                    >
                      <ThumbnailCard nft={media} />
                    </Box>
                  ))}
                </SimpleGrid>
                {/* {artist?.nfts ? ( */}
                <Box m="">
                  <Flex p="2" align="center" justify="space-between">
                    <Text fontSize="lg" fontWeight="600">
                      My NFTs
                    </Text>
                    <IconButton
                      // onClick={() => navigate("/upload")}
                      bg="none"
                      icon={<AiOutlineUpload size="15px" color="black" />}
                      aria-label="Edit user details"
                    ></IconButton>
                  </Flex>
                  {/* {artist?.nfts?.length === 0 && (
                    <MessageBox>"You don't have any media to show"</MessageBox>
                  )}
                  {artist?.nfts?.length !== 0 && (
                    <SimpleGrid
                      p="2"
                      w="100%"
                      minW="0"
                      minH="0"
                      gap="2"
                      columns={[2, 4]}
                    >
                      {artist?.nfts?.map((nft: Record<string, any>) => (
                        <Box
                          align="center"
                          p=""
                          key={nft?.id}
                          rounded="md"
                          shadow="card"
                          onClick={() => navigate(`/nft/${nft?.id}`)}
                        >
                          {isLoading ? (
                            <HLoading loading={isLoading} />
                          ) : isError ? (
                            <MessageBox variant="danger">{isError}</MessageBox>
                          ) : (
                            <ThumbnailCard nft={nft} />
                          )}
                        </Box>
                      ))}
                    </SimpleGrid>
                  )} */}
                </Box>
                {/* ) : (
                  <MessageBox>"No Permanently Stored NFT Here"</MessageBox>
                )} */}
              </Stack>
            )}
          </Stack>
        </Center>
      </Box>
    </Box>
  );
}
