import {
  AD_CREDITS_FAIL,
  AD_CREDITS_REQUEST,
  AD_CREDITS_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_RESET,
  WALLET_CREATE_SUCCESS,
  WALLET_DETAILS_FAIL,
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_EDIT_FAIL,
  WALLET_EDIT_REQUEST,
  WALLET_EDIT_RESET,
  WALLET_EDIT_SUCCESS,
} from "Constants/walletConstants";

export function walletCreateReducer(state = {}, action) {
  switch (action.type) {
    case WALLET_CREATE_REQUEST:
      return { loading: true };
    case WALLET_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        createdWalletData: action.payload,
      };
    case WALLET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export function walletEditReducer(state = {}, action) {
  switch (action.type) {
    case WALLET_EDIT_REQUEST:
      return { loading: true };
    case WALLET_EDIT_SUCCESS:
      return { loading: false, wallet: action.payload, success: true };
    case WALLET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case WALLET_EDIT_RESET:
      return {};
    default:
      return state;
  }
}

export function walletDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case WALLET_DETAILS_REQUEST:
      return { loading: true };
    case WALLET_DETAILS_SUCCESS:
      return { loading: false, wallet: action.payload };
    case WALLET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function adCreditsGetReducer(state = { loading: true }, action) {
  switch (action.type) {
    case AD_CREDITS_REQUEST:
      return { loading: true };
    case AD_CREDITS_SUCCESS:
      return { loading: false, data: action.payload };
    case AD_CREDITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
