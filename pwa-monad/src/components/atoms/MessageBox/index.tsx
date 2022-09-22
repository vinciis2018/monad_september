import { Box, Text } from "@chakra-ui/react";

export default function MessageBox(props: any) {
  return (
    <Box
      bg={props.variant === "danger" ? "red.200" : "green.100"}
      rounded="lg"
      shadow="card"
      p="4"
      m="2"
    >
      <Text fontSize="sm" fontWeight="600">
        {props.children}
      </Text>
    </Box>
  );
}
