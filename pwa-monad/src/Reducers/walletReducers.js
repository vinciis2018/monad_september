import {
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_RESET,
  WALLET_CREATE_SUCCESS,
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
