// import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import animationData from "assets/json/animation.json";
import { Modal, ModalContent, Box } from "@chakra-ui/react";

interface Props {
  handleClose?: () => void;
  loading: boolean;
}

export default function HLoading({
  loading = false,
  handleClose = () => {},
}: Props) {
  return (
    <Modal
      // width="100%"
      // color="#fff"
      // zIndex={(theme: any) => theme.zIndex.drawer + 1}
      isOpen={loading}
      onClose={handleClose}
      isCentered
    >
      <ModalContent align="center">
        <Box align="center">
          <Lottie
            animationData={animationData}
            style={{ width: "200px", height: "200px" }}
          />
        </Box>
      </ModalContent>
      {/* <CircularProgress color="inherit" /> */}
    </Modal>
  );
}
