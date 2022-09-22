/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// hooks
import { useLogin, useWallet } from "components/contexts";
import { useNavigate } from "react-router-dom";

import { isPWA } from "utils/util";
import {
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Center,
  Box,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import koii_large from "assets/koii.png";
import mona_large from "assets/logo.png";
import { createWallet, editWallet } from "../../../Actions/walletActions";
// import { signout } from "Actions/userActions";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";

let deferredPrompt: Event;

export function PinSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { register } = useLogin();
  const [pwaMode, setPwaMode] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [recModal, setRecModal] = useState<Boolean>(false);

  const [userMnemonics, setUserMnemonics] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setupPin,
    generateAndSave,
    importAndSave,
    getTempSavedPin,
    wipeTempSavedPin,
    getArweavePublicAddress,
  } = useWallet();

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const registerUser = () => {
    const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
    register(expired);

    getTempSavedPin().then((pin: string | null) => {
      if (pin) {
        setupPin(pin)
          .then(() => wipeTempSavedPin())
          .then(() => generateAndSave(pin));
        const defWallet = getArweavePublicAddress();
        console.log(defWallet);
        if (userInfo?.defaultWallet === undefined || null || "") {
          dispatch(createWallet(defWallet));
        }
        if (userInfo?.defaultWallet !== defWallet) {
          dispatch(
            editWallet({
              defWallet,
            })
          );
        }
        navigate("/upload");
      } else {
        navigate("/pin-create");
      }
    });
  };

  const handleAgree = async () => {
    if (installable) {
      // Show the install prompt
      await appInstallLuncher();
    } else {
      registerUser();
    }
  };

  const appInstallLuncher = async () => {
    // Hide the app provided install promotion
    setInstallable(false);
    let dt: any = deferredPrompt;
    // Show the install prompt
    dt.prompt();
    // Wait for the user to respond to the prompt
    dt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        registerUser();
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  useEffect(() => {
    if (isPWA()) {
      setPwaMode(true);
      setInstallable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPWA()]);

  const onClick = async () => {
    handleAgree();
  };

  const onClickRecovery = async () => {
    const keys = userMnemonics.split(" ");
    if (keys.filter((k) => k !== "").length !== 12) {
      setErr("You should input 12 words. Try again.");
    } else {
      setLoading(true);
      getTempSavedPin().then((pin) => {
        console.log(pin);
        if (pin) {
          wipeTempSavedPin()
            .then((res) => {
              console.log(res);
              importAndSave(pin, userMnemonics);
              console.log(userMnemonics);
            })
            .then((res) => {
              console.log(res);
              setErr("");
              const defWallet = getArweavePublicAddress();
              console.log(defWallet);
              if (userInfo?.defaultWallet === undefined || null || "") {
                dispatch(createWallet(defWallet));
              } else {
                dispatch(editWallet(defWallet));
              }
              navigate("/upload");
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          navigate("/pin-create");
        }
      });
    }
  };

  const openRecoveryModal = () => {
    setRecModal(!recModal);
  };
  return (
    <Box px="2" pt="20" color="black.500">
      <Center maxW="container.lg" minH="600" mx="auto" pt="10" pb="8">
        <Stack pt="100" p="8" rounded="lg" shadow="card">
          <Box align="center">
            <Image width="15%" src={mona_large} />
            <Flex px="2" justify="center" align="center">
              <Text p="2" fontSize="xs">
                Powered by
              </Text>
              <Image width="3%" src={koii_large} />
            </Flex>
          </Box>
          <hr />
          <Box px="2" justify="center" align="center">
            <Tooltip
              rounded="lg"
              shadow="card"
              bgColor="violet.500"
              p="4"
              label="kisi ko batana ni"
              aria-label="A tooltip"
            >
              <Image
                alt="kisi ko batana ni"
                p="4"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/reading-book-3025706-2526904.png"
              />
            </Tooltip>
            <Text fontSize="md">You’re all set up.</Text>
            {!pwaMode ? (
              <Text>
                Create content so you can start earning attention rewards away.
              </Text>
            ) : (
              <Text>
                Save Monad to your home screen so creating to earn is only a
                click away!
              </Text>
            )}
          </Box>
          {!recModal ? (
            <Stack>
              <Button
                m="4"
                variant="outline"
                color="violet.500"
                width="100%"
                onClick={onClick}
              >
                {!pwaMode ? "Let's Go" : "Save & Launch"}
              </Button>
              {installable && (
                <Text p="2" fontSize="sm">
                  You can install our app on your home screen as well
                </Text>
              )}
              <Box p="4" align="center">
                <Text fontSize="">Have the Finnie Wallet?</Text>
                <Text
                  onClick={openRecoveryModal}
                  fontSize="sm"
                  fontWeight="600"
                >
                  Connect your existing key with a{" "}
                  <strong>Recovery phrase</strong>
                </Text>
              </Box>
            </Stack>
          ) : (
            <Stack>
              <Box py="4">
                {err && <MessageBox variant="danger">{err}</MessageBox>}
                {loading && <HLoading loading={loading} />}
                <Input
                  placeholder="Enter your recovery phrase"
                  onChange={(e: any) => setUserMnemonics(e.target.value)}
                />
              </Box>
              <Button
                p="4"
                variant="outline"
                color="violet.500"
                onClick={onClickRecovery}
              >
                Continue
              </Button>
            </Stack>
          )}
        </Stack>
      </Center>
    </Box>
  );
}
