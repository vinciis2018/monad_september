import { Box, Text, Input } from "@chakra-ui/react";

export const InputItem = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box display="flex" alignItems="center" marginBottom="5px">
      <Text sx={{ color: "black", minWidth: "30px" }}>{label}.</Text>
      <Input value={value} onChange={onChange} />
    </Box>
  );
};
