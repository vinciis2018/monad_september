import { Stack, Flex, Text } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
export function Rating(props: any) {
  // const { rating, numReviews, caption } = props;
  const { numReviews, caption } = props;
  return (
    <Stack align="center" p="1" rounded="md" bg="green.500" color="white">
      {caption ? (
        <Text fontSize="sm">{caption}</Text>
      ) : (
        <Flex align="center" justify="space-between">
          <Text fontSize="15">{numReviews}</Text>
          <AiOutlineStar fontSize="15" />
          {/* <Text fontSize="15">{rating}</Text> */}
        </Flex>
      )}
    </Stack>
  );
}
