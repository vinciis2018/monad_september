import { useEffect } from "react";
// hooks
import { Flex } from "@chakra-ui/react";
import {
  AiOutlineReload,
  AiOutlineCamera,
  AiOutlinePicture,
} from "react-icons/ai";

export default function CameraHandlers({
  onShut,
  onSwitch,
}: {
  onShut?: () => void;
  onSwitch?: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex p="1" align="center" justify="space-between">
      <AiOutlineReload onClick={onSwitch} size="40px" color="gray" />
      <AiOutlineCamera onClick={onShut} size="40px" color="gray" />
      <AiOutlinePicture size="40px" color="gray" />
    </Flex>
  );
}
