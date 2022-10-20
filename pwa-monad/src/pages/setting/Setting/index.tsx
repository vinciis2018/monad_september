/* eslint-disable prettier/prettier */
import { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";
// hooks
import { useLogin, useWallet } from "components/contexts";

import { Box, Center, Flex, Stack, Text, Button } from "@chakra-ui/react";
import { CopyableAddress } from "components/ui";
import { AiOutlineUpload, AiOutlineFileImage, AiOutlineWarning } from "react-icons/ai"
import { isPWA } from "utils/util";
import { KeyPhraseSaveModal } from "components/modals/KeyPhraseSaveModal";
import { isSeedPhraseSaved } from "services";
// import { sendMail } from "Actions/userActions";

let deferredPrompt: Event;

export function Setting() {
  const navigate = useNavigate();
  const [pwaMode, setPwaMode] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [showKeyPhraseSaveModal, setShowKeyPhraseSaveModal] =
    useState<boolean>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  
  const { logout: logoutUser, lock: lockUser } = useLogin();
  const { lock } = useWallet();

  const { getArweavePublicAddress } = useWallet();

  // const [mail, setMail] = useState<any>({
  //   to: userInfo.email,
  //   subject: "",
  //   description: "",
  // });

  // const dispatch = useDispatch<any>();

  const gotoRecovery = () => {
    if (!navigator.onLine) {
      navigate("/setting/wifi-test");
    } else {
      navigate("/setting/recovery");
    }
  };

  const appInstallLuncher = () => {
    // Hide the app provided install promotion
    setInstallable(false);
    let dt: any = deferredPrompt;
    // Show the install prompt
    dt.prompt();
    // Wait for the user to respond to the prompt
    dt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        // eslint-disable-next-line no-console
        console.log("User accepted the install prompt");
      } else {
        // eslint-disable-next-line no-console
        console.log("User dismissed the install prompt");
      }
    });
  };

  useEffect(() => {
  
    isSeedPhraseSaved().then((visited) => {
      setShowKeyPhraseSaveModal(!visited);
      // setMail({
      //   to: userInfo.email,
      //   subject: "HIGHLY CONFIDENTIAL",
      //   description: `This is your mnemonic keys: 
      //     <br/>
      //     ${mnemonics}
      //     <br/>
      //     Please keep it secure, off the internet and 
      //     delete this email from inbox, archives/recycle bin.
      //   `
      // })
    });

    if(!getArweavePublicAddress()) {
      navigate("/login")
    }

    if (isPWA()) {
      setPwaMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getArweavePublicAddress, lock, lockUser, logoutUser, navigate, userInfo])

  const handleCloseModal = () => {
    setShowKeyPhraseSaveModal(false);
  };

  const handleSecureMyAccountClick = useCallback(() => {
    setShowKeyPhraseSaveModal(false);
    navigate("/key-phrase-save");
  }, [navigate]);

  const onClick = async () => {
    if (installable) {
      // Show the install prompt
      await appInstallLuncher();
    }
  };

  // const sendMailKey = () => {
  //   dispatch(sendMail(mail))
  // }
  return (
    <Box px="2" pt="20" color="black">
      <Center maxW="container.lg" pt="10" minH="600" mx="auto" pb="8">
          <Stack p="8" rounded="lg" shadow="card">
            <Flex p="4" justify="space-between" align="center">
              <AiOutlineUpload size="20px" color="black" onClick={() => navigate(`/upload`)} />
              <Text fontSize="lg" fontWeight="600" >
                Wallet & Security
              </Text>
              <AiOutlineFileImage size="20px" color="black" onClick={() => navigate(`/customImages`)} />
            </Flex>
            <hr />
            <Flex align="center" justify="space-between">
              <Text p="4" fontSize="sm">WALLET ADDRESS :</Text>
              <CopyableAddress address={getArweavePublicAddress()} w="100%" maxW="200px" />
            </Flex>
            <hr />
            <Box align="center">
              <Text fontWeight="600" color="green.500">Change wallet</Text>
            </Box>
            {/* <Box align="center">
              <Text onClick={sendMailKey}>Get you private keys on mail</Text>
              <Text fontSize="sm" color="red.500">
                This can be highly insecure if your inbox is opened on more than one computer
              </Text>
            </Box> */}
            <hr />
            <Box align="center">
              <Text fontWeight="600" color="violet.500" onClick={onClick}>
                {pwaMode && <Text>"Save on HomeScreen"</Text>}
              </Text>
            </Box>
            <Flex align="center" justify="space-between">
              <Text p="4" fontSize="sm">GET RECOVERY PHRASE</Text>
              <Button variant="outline" color="violet.500" onClick={gotoRecovery}>Reveal Recovery Phrase</Button>
            </Flex>
            <Flex align="center" justify="space-between">
              <Text p="4" fontSize="sm">UPDATE FINNIE PIN</Text>
              <Button variant="outline" color="violet.500" onClick={() => navigate("/setting/update-pin")}>Update PIN</Button>
            </Flex>
            <hr />
            <Text p="2" textAlign="center">UPDATE FINNIE PIN</Text>            
            <Text p="2" textAlign="center">
              When you unlock Finnie using the self-destruct PIN,
              <br />
              <strong>all app data will be deleted.</strong> 
              <br />
              You can retrieve the data from any device at a later time using your recovery phrase.
            </Text>
            <hr />
            <Box onClick={() => navigate("/setting/self-destruct-pin")} p="4" align="center">
              <AiOutlineWarning fontSize="50px" color="red"/>
              <Text p="2">Set Up Self-Destruct PIN</Text>
            </Box>
            <Button bgColor="violet.500" onClick={() => navigate("/setting/self-destruct")}>
              Inactive
            </Button>
            <KeyPhraseSaveModal
              onClose={handleCloseModal}
              open={showKeyPhraseSaveModal}
              onSecureMyAccountClick={handleSecureMyAccountClick}
            />
          </Stack>
      </Center>
    </Box>
  );
}
