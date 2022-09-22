import Axios from "axios";
import {
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS,
  WALLET_EDIT_FAIL,
  WALLET_EDIT_REQUEST,
  WALLET_EDIT_SUCCESS,
} from "Constants/walletConstants";

// wallet create
export const createWallet = (defWallet) => async (dispatch, getState) => {
  dispatch({
    type: WALLET_CREATE_REQUEST,
    payload: defWallet,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  const user = userInfo;
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/walletCreate`,
      {
        user,
        defWallet,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: WALLET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: WALLET_CREATE_FAIL,
      payload: message,
    });
  }
};

// wallet update
export const editWallet = (wallet) => async (dispatch, getState) => {
  dispatch({
    type: WALLET_EDIT_REQUEST,
    payload: wallet,
  });

  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/${userInfo._id}`,
      wallet,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: WALLET_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: WALLET_EDIT_FAIL,
      payload: message,
    });
  }
};
