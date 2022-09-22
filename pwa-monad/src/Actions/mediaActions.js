import Axios from "axios";
import {
  GET_ALL_MEDIA_FAIL,
  GET_ALL_MEDIA_REQUEST,
  GET_ALL_MEDIA_SUCCESS,
  GET_MEDIA_FAIL,
  GET_MEDIA_REQUEST,
  GET_MEDIA_SUCCESS,
  GET_MY_MEDIA_FAIL,
  GET_MY_MEDIA_REQUEST,
  GET_MY_MEDIA_SUCCESS,
  GET_MEDIA_THUMBNAIL_FAIL,
  GET_MEDIA_THUMBNAIL_REQUEST,
  GET_MEDIA_THUMBNAIL_SUCCESS,
  MEDIA_UPLOAD_FAIL,
  MEDIA_UPLOAD_REQUEST,
  MEDIA_UPLOAD_SUCCESS,
} from "Constants/mediaConstants";

export const uploadMedia =
  ({ cid, owner, userId }) =>
  async (dispatch, getState) => {
    dispatch({
      type: MEDIA_UPLOAD_REQUEST,
      payload: { cid, owner, userId },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/media/create`,
        {
          cid,
          owner,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: MEDIA_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: MEDIA_UPLOAD_FAIL,
        payload: message,
      });
    }
  };

export const getMedia = (mediaId) => async (dispatch, getState) => {
  dispatch({
    type: GET_MEDIA_REQUEST,
    payload: mediaId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/media/${mediaId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const getAllMedia = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_MEDIA_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/media`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_ALL_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_ALL_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const getMyMedia = () => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_MEDIA_REQUEST,
    // payload: userInfo,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/media/${userInfo._id}/my`,
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: GET_MY_MEDIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MY_MEDIA_FAIL,
      payload: message,
    });
  }
};

export const getMediaThumbnail = (media) => async (dispatch, getState) => {
  dispatch({
    type: GET_MEDIA_THUMBNAIL_REQUEST,
    payload: media,
  });

  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/media/${media.cid}/generateThumbnail`,
      media
    );
    dispatch({
      type: GET_MEDIA_THUMBNAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_MEDIA_THUMBNAIL_FAIL,
      payload: message,
    });
  }
};
