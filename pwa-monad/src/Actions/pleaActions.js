import Axios from "axios";
import {
  ALL_PLEA_LIST_FAIL,
  ALL_PLEA_LIST_REQUEST,
  ALL_PLEA_LIST_SUCCESS,
} from "Constants/pleaConstants";

export const listAllPleas = () => async (dispatch, getState) => {
  dispatch({
    type: ALL_PLEA_LIST_REQUEST,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/pleas/allPleas`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: ALL_PLEA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PLEA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
