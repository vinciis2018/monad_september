import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Map } from "./Map";
import { Box, Stack, Input, Text } from "@chakra-ui/react";
import { getPinJson } from "../../Actions/pinActions";

import { AiOutlineEnvironment, AiOutlineArrowLeft } from "react-icons/ai";
import MessageBox from "components/atoms/MessageBox";
import HLoading from "components/atoms/HLoading";
import { Screen } from "components/common";
import { detailsScreen } from "Actions/screenActions";

export function MapBox(props: any) {
  const navigate = useNavigate();

  const screenId = window.location.href.split("/").slice()[4];

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const jsonPins = useSelector((state: any) => state.jsonPins);
  const { Loading: loadingAllPins, error: errorAllPins, jsonData } = jsonPins;

  const screenDetails = useSelector((state: any) => state.screenDetails);
  const { loading: loadingScreen, error: errorScreen, screen } = screenDetails;

  const dispatch = useDispatch<any>();

  React.useEffect(() => {
    // if(!jsonData) {
    dispatch(getPinJson());
    // }

    if (screenId) {
      dispatch(detailsScreen(screenId));
    }
  }, [dispatch, screenId, userInfo]);

  return (
    <Box px="2" pt="20" color="black.500">
      <Box maxW="container.lg" mx="auto" pb="8">
        <Stack align="center" p="2" direction="row" justify="space-between">
          <AiOutlineArrowLeft
            color="black.500"
            fontSize="20"
            onClick={() => navigate(-1)}
          />
          <Input
            rounded="2xl"
            variant="outline"
            placeholder="Search by Location"
            fontWeight="600"
          />
          <AiOutlineEnvironment fontSize="20" color="violet.500" />
        </Stack>
        {loadingAllPins && <HLoading loading={loadingAllPins} />}
        {errorAllPins && (
          <MessageBox variant="danger">{errorAllPins}</MessageBox>
        )}
        {jsonData !== undefined && (
          <Box p="1" rounded="md" width="100%" height="100%">
            <Map mapProps={jsonData} />
          </Box>
        )}
        {screenId && (
          <>
            {loadingScreen ? (
              <HLoading loading={loadingScreen} />
            ) : errorScreen ? (
              <MessageBox variant="danger">{errorScreen}</MessageBox>
            ) : (
              <Box p="2" shadow="card" rounded="lg">
                <Screen key={screen._id} screen={screen} />
                <Text fontSize="xs" fontWeight="600">
                  Currently Playing
                </Text>
                <Box
                  onClick={() =>
                    navigate(
                      `/screen/${screen._id}/${
                        screen.image.split("/").slice(-1)[0]
                      }/
                    ${screen.activeGameContract}
                  }`
                    )
                  }
                  as="video"
                  autoPlay
                  loop
                  controls
                  muted
                  boxSize="100%"
                >
                  <source
                    src={`https://ipfs.io/ipfs/${screen.lastPlayed
                      .split(".")
                      .slice(0, 1)}`}
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
