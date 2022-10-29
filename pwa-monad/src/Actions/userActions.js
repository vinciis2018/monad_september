import Axios from "axios";
import {
  SEND_MAIL_FAIL,
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SCREENS_FAIL,
  USER_SCREENS_REQUEST,
  USER_SCREENS_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_VIDEOS_FAIL,
  USER_VIDEOS_REQUEST,
  USER_VIDEOS_SUCCESS,
} from "Constants/userConstants";

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users/signup`,
      {
        name,
        email,
        password,
      }
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users/signin`,
      {
        email,
        password,
      }
    );
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SIGNOUT

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_SIGNOUT,
  });
};

// USERDETAILS

export const detailsUser =
  ({ userId, walletAddress }) =>
  async (dispatch, getState) => {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: userId,
    });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userInfo._id}/${walletAddress}`,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };

// USERPROFILE UPDATE

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: user,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users/profile`,
      user,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

// list users

export const listUsers = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

// delete Users
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_REQUEST,
    payload: userId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

// get user screen list

export const userScreensList = (user) => async (dispatch, getState) => {
  // console.log("trying user screens list");
  try {
    dispatch({ type: USER_SCREENS_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    if (userInfo) {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/users/${user._id}/${user.defaultWallet}/myScreens`,
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
      dispatch({ type: USER_SCREENS_SUCCESS, payload: data });
    } else {
      // return console.log("no user found");
    }
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_SCREENS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user videolist

export const userVideosList = (user) => async (dispatch, getState) => {
  // console.log("trying user video list");
  try {
    dispatch({ type: USER_VIDEOS_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();
    if (userInfo) {
      // console.log(user);
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/users/${user._id}/${user.defaultWallet}/myVideos`,
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
      dispatch({ type: USER_VIDEOS_SUCCESS, payload: data });
    } else {
      // return console.log("no user found");
    }
  } catch (error) {
    // console.log(error);
    dispatch({
      type: USER_VIDEOS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendMail = (mail) => async (dispatch, getState) => {
  dispatch({
    type: SEND_MAIL_REQUEST,
    payload: mail,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/users/send/mail`,
      mail,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: SEND_MAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
