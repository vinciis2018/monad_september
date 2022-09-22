import Axios from "axios";
import {
  ADVERT_DELETE_FAIL,
  ADVERT_DELETE_REQUEST,
  ADVERT_DELETE_SUCCESS,
  ADVERT_DETAILS_FAIL,
  ADVERT_DETAILS_REQUEST,
  ADVERT_DETAILS_SUCCESS,
  ADVERT_FLAG_FAIL,
  ADVERT_FLAG_REQUEST,
  ADVERT_FLAG_SUCCESS,
  ADVERT_LIST_FAIL,
  ADVERT_LIST_REQUEST,
  ADVERT_LIST_SUCCESS,
  ADVERT_PARAMS_FAIL,
  ADVERT_PARAMS_REQUEST,
  ADVERT_PARAMS_SUCCESS,
  ADVERT_UPDATE_FAIL,
  ADVERT_UPDATE_REQUEST,
  ADVERT_UPDATE_SUCCESS,
  LIKE_ADVERT_FAIL,
  LIKE_ADVERT_REQUEST,
  LIKE_ADVERT_SUCCESS,
  REVIEW_ADVERT_FAIL,
  REVIEW_ADVERT_REQUEST,
  REVIEW_ADVERT_SUCCESS,
  UNLIKE_ADVERT_FAIL,
  UNLIKE_ADVERT_REQUEST,
  UNLIKE_ADVERT_SUCCESS,
  UPLOAD_ADVERT_FAIL,
  UPLOAD_ADVERT_REQUEST,
  UPLOAD_ADVERT_SUCCESS,
} from "Constants/advertConstants";

export const listAllVideos = () => async (dispatch) => {
  dispatch({ type: ADVERT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/`
    );
    dispatch({ type: ADVERT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADVERT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// upload Video

export const uploadVideo =
  (screenId, campaign) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPLOAD_ADVERT_REQUEST,
        payload: (screenId, campaign),
      });

      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/screen/${screenId}`,
        { userInfo, campaign },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: UPLOAD_ADVERT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: UPLOAD_ADVERT_FAIL,
        payload: message,
      });
    }
  };

// video details

export const getVideoDetails = (videoId) => async (dispatch) => {
  dispatch({
    type: ADVERT_DETAILS_REQUEST,
    payload: videoId,
  });

  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}`
    );
    dispatch({
      type: ADVERT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADVERT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get video params

export const getVideoParams = (videoId) => async (dispatch) => {
  dispatch({
    type: ADVERT_PARAMS_REQUEST,
    payload: videoId,
  });
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/advertParams`
    );
    dispatch({
      type: ADVERT_PARAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADVERT_PARAMS_FAIL,
      error: message,
    });
  }
};

// update video

export const updateVideo = (video) => async (dispatch, getState) => {
  dispatch({
    type: ADVERT_UPDATE_REQUEST,
    payload: video,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.put(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${video._id}`,
      video,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: ADVERT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADVERT_UPDATE_FAIL,
      error: message,
    });
  }
};

// delete video

export const deleteVideo = (videoId) => async (dispatch, getState) => {
  dispatch({
    type: ADVERT_DELETE_REQUEST,
    payload: videoId,
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}`,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({
      type: ADVERT_DELETE_SUCCESS,
      payload: data,
    });
    // console.log({ data });
  } catch (error) {
    dispatch({
      type: ADVERT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// like video

export const likeVideo =
  (videoId, interaction) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({
        type: LIKE_ADVERT_REQUEST,
        payload: videoId,
      });
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/likeVideo/${interaction}`,
        { videoId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: LIKE_ADVERT_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({
        type: LIKE_ADVERT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// unlike video

export const unlikeVideo = (videoId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: UNLIKE_ADVERT_REQUEST, payload: videoId });
    const { data } = await Axios.delete(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/unlikeVideo`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: UNLIKE_ADVERT_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: UNLIKE_ADVERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// video flag
export const flagVideo =
  (videoId, interaction) => async (dispatch, getState) => {
    dispatch({
      type: ADVERT_FLAG_REQUEST,
      payload: videoId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    // console.log("video Id found");
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/flagVideo/${interaction}`,
        { videoId },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ADVERT_FLAG_SUCCESS, payload: data, success: true });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: ADVERT_FLAG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// review video

export const reviewVideo = (videoId, review) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    dispatch({ type: REVIEW_ADVERT_REQUEST, payload: videoId });
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: REVIEW_ADVERT_SUCCESS,
      payload: data.review,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_ADVERT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
