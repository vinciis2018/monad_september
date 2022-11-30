import Axios from "axios";
import {
  AD_CREDITS_FAIL,
  AD_CREDITS_REQUEST,
  AD_CREDITS_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS,
  WALLET_DETAILS_FAIL,
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
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
export const editWallet =
  ({ walletAdd }) =>
  async (dispatch, getState) => {
    dispatch({
      type: WALLET_EDIT_REQUEST,
      payload: walletAdd,
    });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/${userInfo._id}`,
        {
          walletAdd,
        },
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

// details wallet
export const getWalletDetails = (walletId) => async (dispatch, getState) => {
  dispatch({
    type: WALLET_DETAILS_REQUEST,
    payload: walletId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/${walletId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: WALLET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: WALLET_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const getAdCredits = () => async (dispatch, getState) => {
  dispatch({
    type: AD_CREDITS_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/wallet/adcredit/ad`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: AD_CREDITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AD_CREDITS_FAIL,
      payload: message,
    });
  }
};
