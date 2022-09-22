import {
  ADVERT_DELETE_FAIL,
  ADVERT_DELETE_REQUEST,
  ADVERT_DELETE_RESET,
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
  ADVERT_UPDATE_RESET,
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
  UPLOAD_ADVERT_RESET,
  UPLOAD_ADVERT_SUCCESS,
} from "Constants/advertConstants";

export function videoListAllReducer(state = { allAdverts: [] }, action) {
  switch (action.type) {
    case ADVERT_LIST_REQUEST:
      return { loading: true };
    case ADVERT_LIST_SUCCESS:
      return { loading: false, allVideos: action.payload };
    case ADVERT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoUploadReducer(state = {}, action) {
  switch (action.type) {
    case UPLOAD_ADVERT_REQUEST:
      return { loading: true };
    case UPLOAD_ADVERT_SUCCESS:
      return { loading: false, uploadedVideo: action.payload, success: true };
    case UPLOAD_ADVERT_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_ADVERT_RESET:
      return {};
    default:
      return state;
  }
}

export function videoDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case ADVERT_DETAILS_REQUEST:
      return { loading: true };
    case ADVERT_DETAILS_SUCCESS:
      return { loading: false, video: action.payload };
    case ADVERT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoParamsReducer(state = { loading: false }, action) {
  switch (action.type) {
    case ADVERT_PARAMS_REQUEST:
      return { loading: true };
    case ADVERT_PARAMS_SUCCESS:
      return { loading: false, params: action.payload };
    case ADVERT_PARAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoUpdateReducer(state = { video: {} }, action) {
  switch (action.type) {
    case ADVERT_UPDATE_REQUEST:
      return { loading: true };
    case ADVERT_UPDATE_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case ADVERT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADVERT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}

export function videoDeleteReducer(state = {}, action) {
  switch (action.type) {
    case ADVERT_DELETE_REQUEST:
      return { loading: true };
    case ADVERT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADVERT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ADVERT_DELETE_RESET:
      return {};
    default:
      return state;
  }
}

export function videoLikeReducer(state = { video: {} }, action) {
  switch (action.type) {
    case LIKE_ADVERT_REQUEST:
      return { loading: true };
    case LIKE_ADVERT_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true };
    case LIKE_ADVERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoUnlikeReducer(state = { video: {} }, action) {
  switch (action.type) {
    case UNLIKE_ADVERT_REQUEST:
      return { loading: true };
    case UNLIKE_ADVERT_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true };
    case UNLIKE_ADVERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// video flag

export function videoFlagReducer(state = { video: {} }, action) {
  switch (action.type) {
    case ADVERT_FLAG_REQUEST:
      return { loading: true };
    case ADVERT_FLAG_SUCCESS:
      return { ...state, loading: false, video: action.payload, success: true };
    case ADVERT_FLAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoReviewReducer(state = { video: {} }, action) {
  switch (action.type) {
    case REVIEW_ADVERT_REQUEST:
      return { loading: true };
    case REVIEW_ADVERT_SUCCESS:
      return { loading: false, video: action.payload, success: true };
    case REVIEW_ADVERT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
