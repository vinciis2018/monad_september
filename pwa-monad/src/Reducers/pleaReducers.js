import {
  ALL_PLEA_LIST_FAIL,
  ALL_PLEA_LIST_REQUEST,
  ALL_PLEA_LIST_SUCCESS,
} from "Constants/pleaConstants";

export function allPleasListReducer(state = { allPleas: [] }, action) {
  switch (action.type) {
    case ALL_PLEA_LIST_REQUEST:
      return { loading: true };
    case ALL_PLEA_LIST_SUCCESS:
      return { loading: false, success: true, allPleas: action.payload };
    case ALL_PLEA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
