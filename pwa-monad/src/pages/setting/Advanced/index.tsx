import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  Center,
  Stack,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { open_database, open_gallery } from "assets/svgs";

export function Advanced() {
  const theme = useTheme();
  return (
    <Box px="2" pt="20">
      <Center maxW="container.lg" minH="600" mx="auto" pb="8">
        <Stack p="8" rounded="lg" shadow="card">
          <Box
            sx={{ padding: "14px", display: "flex", flexDirection: "column" }}
          >
            <Text gutterBottom>Advanced Self Destruct PIN</Text>
            <Text sx={{ marginBottom: "25px" }}>
              The Self-Destruct PIN is a feature to{" "}
              <span style={{ color: theme.palette.warning.main }}>
                help keep you safe.
              </span>
              <br />
              Choose up to 15 images from your camera roll or select from our
              pre-existing list.
              <br /> The image selection can be updated at any time.
            </Text>

            <Button
              color="warning"
              variant="contained"
              sx={{ marginBottom: "16px" }}
            >
              Choose from My Device
            </Button>
            <SimpleGrid container rowSpacing="8px" columnSpacing="8px">
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
            </SimpleGrid>
            <Stack
              direction="row"
              spacing="6px"
              justifyContent="center"
              sx={{ marginBottom: "50px", marginTop: "16px" }}
            >
              <img src={open_gallery} alt="icon" />
              <Text color="warning.main">Open My Gallery</Text>
            </Stack>
            <Button
              color="info"
              variant="contained"
              sx={{ marginBottom: "16px" }}
            >
              Choose from Database
            </Button>
            <SimpleGrid container rowSpacing="8px" columnSpacing="8px">
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
              <Grid item xs={3}>
                <ImgWrapper></ImgWrapper>
              </Grid>
            </SimpleGrid>
            <Stack
              direction="row"
              spacing="6px"
              justifyContent="center"
              sx={{ marginTop: "16px" }}
            >
              <img src={open_database} alt="icon" />
              <Text color="info.main">Open database</Text>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}
const ImgWrapper = styled(Box)(() => ({
  height: 76,
  borderRadius: "2px",
  backgroundColor: "#C4C4C4",
}));
