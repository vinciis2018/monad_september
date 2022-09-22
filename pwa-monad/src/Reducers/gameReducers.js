import {
  CREATE_ADVERT_GAME_FAIL,
  CREATE_ADVERT_GAME_REQUEST,
  CREATE_ADVERT_GAME_SUCCESS,
  CREATE_SCREEN_GAME_FAIL,
  CREATE_SCREEN_GAME_REQUEST,
  CREATE_SCREEN_GAME_SUCCESS,
  DETAILS_ADVERT_GAME_FAIL,
  DETAILS_ADVERT_GAME_REQUEST,
  DETAILS_ADVERT_GAME_SUCCESS,
  DETAILS_SCREEN_GAME_FAIL,
  DETAILS_SCREEN_GAME_REQUEST,
  DETAILS_SCREEN_GAME_SUCCESS,
  REMOVE_ADVERT_GAME_FAIL,
  REMOVE_ADVERT_GAME_REQUEST,
  REMOVE_ADVERT_GAME_SUCCESS,
  REMOVE_SCREEN_GAME_FAIL,
  REMOVE_SCREEN_GAME_REQUEST,
  REMOVE_SCREEN_GAME_SUCCESS,
} from "Constants/gameConstants";

export function screenGameDetailsReducer(state = {}, action) {
  switch (action.type) {
    case DETAILS_SCREEN_GAME_REQUEST:
      return { loading: true };
    case DETAILS_SCREEN_GAME_SUCCESS:
      return { loading: false, screenGameData: action.payload };
    case DETAILS_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// screen

export function screenGameCreateReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_SCREEN_GAME_REQUEST:
      return { loading: true };
    case CREATE_SCREEN_GAME_SUCCESS:
      return { loading: false, success: true, screenGame: action.payload };
    case CREATE_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function screenGameRemoveReducer(state = {}, action) {
  switch (action.type) {
    case REMOVE_SCREEN_GAME_REQUEST:
      return { loading: true };
    case REMOVE_SCREEN_GAME_SUCCESS:
      return { loading: false, success: true, calender: action.payload };
    case REMOVE_SCREEN_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function advertGameDetailsReducer(state = {}, action) {
  switch (action.type) {
    case DETAILS_ADVERT_GAME_REQUEST:
      return { loading: true };
    case DETAILS_ADVERT_GAME_SUCCESS:
      return { loading: false, advertGameData: action.payload };
    case DETAILS_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// advert

export function advertGameCreateReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ADVERT_GAME_REQUEST:
      return { loading: true };
    case CREATE_ADVERT_GAME_SUCCESS:
      return { loading: false, success: true, advertGame: action.payload };
    case CREATE_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function advertGameRemoveReducer(state = {}, action) {
  switch (action.type) {
    case REMOVE_ADVERT_GAME_REQUEST:
      return { loading: true };
    case REMOVE_ADVERT_GAME_SUCCESS:
      return { loading: false, success: true, video: action.payload };
    case REMOVE_ADVERT_GAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
