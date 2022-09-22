// hooks
import { useLogin } from "components/contexts";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  useDisclosure,
  DrawerHeader,
  Flex,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { icon_expanded, icon_collapsed, icon_expanded_dark } from "assets/svgs";
import {
  AiOutlineLock,
  AiOutlineCamera,
  AiOutlinePicture,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineArrowLeft,
} from "react-icons/ai";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  paddingTop?: string;
}

export default function LayoutUpload(props: Props) {
  const { children, bgColor = "black", paddingTop = "95px" } = props;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lock } = useLogin();
  const { pathname } = useLocation();

  const lockScreen = () => {
    lock();
  };

  return (
    <Box sx={{ paddingTop: paddingTop }}>
      <Box p="" onClick={onOpen}>
        <Text p="" textAlign="center" fontSize="sm" color="green.500">
          Live broadcasting will be here soon...
        </Text>
      </Box>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => onClose()} />
          <DrawerHeader direction="row" p="" align="center">
            <Text>
              Live Videos are only in trials, we will inform you about it
              shortly...
            </Text>
            <Flex pt="2" align="center" justify="space-between">
              <AiOutlineHome
                onClick={() => navigate("/")}
                size="20px"
                color="black"
              />
              <AiOutlinePicture
                onClick={() => navigate("/gallery")}
                size="20px"
                color="black"
              />
              <AiOutlineCamera
                onClick={() => navigate("/upload")}
                size="20px"
                color="black"
              />
              <AiOutlineSetting
                onClick={() => navigate("/setting")}
                size="20px"
                color="black"
              />
              <AiOutlineLock onClick={lockScreen} size="20px" color="black" />
            </Flex>
          </DrawerHeader>
          <DrawerBody pt="0">
            {children}
            {pathname !== "/upload" ? (
              <Box>
                <AiOutlineArrowLeft
                  color="black"
                  onClick={() => navigate(-1)}
                />
              </Box>
            ) : (
              <Box>
                <div style={{ width: "40px" }}>&nbsp;</div>
              </Box>
            )}
            <Box pb="">
              <img
                src={
                  bgColor === "blue"
                    ? isOpen
                      ? icon_expanded
                      : icon_collapsed
                    : icon_expanded_dark
                }
                alt="icon"
                style={{ marginTop: 30 }}
                onClick={onOpen}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
