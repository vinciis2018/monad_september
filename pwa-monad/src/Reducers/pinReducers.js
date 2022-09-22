import {
  ALL_PINS_GET_FAIL,
  ALL_PINS_GET_REQUEST,
  ALL_PINS_GET_SUCCESS,
  PIN_GET_FAIL,
  PIN_GET_REQUEST,
  PIN_GET_SUCCESS,
  PIN_UPDATE_FAIL,
  PIN_UPDATE_REQUEST,
  PIN_UPDATE_RESET,
  PIN_UPDATE_SUCCESS,
} from "Constants/pinConstants";

export function jsonPinsReducer(
  state = { loading: true, jsonData: {} },
  action
) {
  switch (action.type) {
    case ALL_PINS_GET_REQUEST:
      return { loading: true };
    case ALL_PINS_GET_SUCCESS:
      return { loading: false, jsonData: action.payload };
    case ALL_PINS_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function pinDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case PIN_GET_REQUEST:
      return { loading: true };
    case PIN_GET_SUCCESS:
      return { loading: false, pin: action.payload };
    case PIN_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function pinUpdateReducer(state = { loading: true }, action) {
  switch (action.type) {
    case PIN_UPDATE_REQUEST:
      return { loading: true };
    case PIN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
}
