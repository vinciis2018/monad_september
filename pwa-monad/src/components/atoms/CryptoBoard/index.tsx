import { Box, SimpleGrid, Text } from "@chakra-ui/react";

interface Props {
  mnemonics: string;
  sx?: any;
}

export default function CryptoBoard({ mnemonics, sx }: Props) {
  const items = mnemonics.split(" ");

  return (
    <SimpleGrid gap={4} columns={[2]}>
      <Box align="center" flex={1}>
        {items
          .filter((_item, _i) => _i < 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 1}`} title={keyword} />
          ))}
      </Box>
      <Box flex={1}>
        {items
          .filter((_item, _i) => _i >= 6)
          .map((keyword, i) => (
            <Item key={i} label={`${i + 7}`} title={keyword} />
          ))}
      </Box>
    </SimpleGrid>
  );
}

export const Item = ({
  label,
  title,
}: {
  label: string;
  title: string | number;
}) => {
  return (
    <Box display="flex" align="center" marginBottom="5px">
      <Text sx={{ color: "black", minWidth: "30px" }}>{label}.</Text>
      <Text sx={{ color: "black" }}>{title}</Text>
    </Box>
  );
};
