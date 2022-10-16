import {
  MEDIA_UPLOAD_REQUEST,
  MEDIA_UPLOAD_SUCCESS,
  MEDIA_UPLOAD_FAIL,
  MEDIA_UPLOAD_RESET,
  GET_MY_MEDIA_SUCCESS,
  GET_MY_MEDIA_FAIL,
  GET_MY_MEDIA_REQUEST,
  GET_MEDIA_REQUEST,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_FAIL,
  GET_ALL_MEDIA_FAIL,
  GET_ALL_MEDIA_SUCCESS,
  GET_ALL_MEDIA_REQUEST,
  GENERATE_VIDEO_FROM_IMAGES_REQUEST,
  GENERATE_VIDEO_FROM_IMAGES_SUCCESS,
  GENERATE_VIDEO_FROM_IMAGES_FAIL,
} from "../Constants/mediaConstants";

// upload Video
export function mediaUploadReducer(state = {}, action) {
  switch (action.type) {
    case MEDIA_UPLOAD_REQUEST:
      return { loading: true };
    case MEDIA_UPLOAD_SUCCESS:
      return { loading: false, media: action.payload, success: true };
    case MEDIA_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    case MEDIA_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
}

export function mediaGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_MEDIA_REQUEST:
      return { loading: true };
    case GET_MEDIA_SUCCESS:
      return { loading: false, media: action.payload };
    case GET_MEDIA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function allMediaReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_MEDIA_REQUEST:
      return { loading: true };
    case GET_ALL_MEDIA_SUCCESS:
      return { loading: false, allMedia: action.payload };
    case GET_ALL_MEDIA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function myMediaReducer(state = {}, action) {
  switch (action.type) {
    case GET_MY_MEDIA_REQUEST:
      return { loading: true };
    case GET_MY_MEDIA_SUCCESS:
      return { loading: false, medias: action.payload };
    case GET_MY_MEDIA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function videoFromImagesReducer(state = {}, action) {
  switch (action.type) {
    case GENERATE_VIDEO_FROM_IMAGES_REQUEST:
      return { loading: true };
    case GENERATE_VIDEO_FROM_IMAGES_SUCCESS:
      return { loading: false, video: action.payload };
    case GENERATE_VIDEO_FROM_IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
