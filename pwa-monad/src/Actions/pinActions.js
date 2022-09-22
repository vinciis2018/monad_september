import Axios from "axios";
import {
  ALL_PINS_GET_FAIL,
  ALL_PINS_GET_REQUEST,
  ALL_PINS_GET_SUCCESS,
  PIN_GET_FAIL,
  PIN_GET_REQUEST,
  PIN_GET_SUCCESS,
  PIN_UPDATE_FAIL,
  PIN_UPDATE_REQUEST,
  PIN_UPDATE_SUCCESS,
} from "Constants/pinConstants";

export const getPinJson = () => async (dispatch) => {
  dispatch({
    type: ALL_PINS_GET_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/pins/allPinGeoJson`
    );
    dispatch({
      type: ALL_PINS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PINS_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPinDetails = (pinId) => {
  return async (dispatch) => {
    dispatch({
      type: PIN_GET_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${pinId}`
      );
      dispatch({
        type: PIN_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PIN_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updatePin = (screenId, pin) => async (dispatch, getState) => {
  dispatch({
    type: PIN_UPDATE_REQUEST,
    payload: screenId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${screenId}`,
      pin,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: PIN_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PIN_UPDATE_FAIL,
      error: message,
    });
  }
};
