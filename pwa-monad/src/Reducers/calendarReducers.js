import {
  SCREEN_CALENDAR_REQUEST,
  SCREEN_CALENDAR_SUCCESS,
  SCREEN_CALENDAR_FAIL,
  BOOK_DAY_SLOT_REQUEST,
  BOOK_DAY_SLOT_SUCCESS,
  BOOK_DAY_SLOT_FAIL,
  BOOK_SLOT_REQUEST,
  BOOK_SLOT_SUCCESS,
  BOOK_SLOT_FAIL,
  BOOK_DAY_REQUEST,
  BOOK_DAY_SUCCESS,
  BOOK_DAY_FAIL,
  ADD_CALENDAR_DATA_REQUEST,
  ADD_CALENDAR_DATA_SUCCESS,
  ADD_CALENDAR_DATA_FAIL,
} from "../Constants/calendarConstants";

export function screenCalenderReducer(state = { loading: true }, action) {
  switch (action.type) {
    case SCREEN_CALENDAR_REQUEST:
      return { loading: true };
    case SCREEN_CALENDAR_SUCCESS:
      return { loading: false, calender: action.payload };
    case SCREEN_CALENDAR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const calenderDataAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CALENDAR_DATA_REQUEST:
      return { loading: true };
    case ADD_CALENDAR_DATA_SUCCESS:
      return { loading: false, calenderSlotData: action.payload };
    case ADD_CALENDAR_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const calenderDaySlotBookReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DAY_SLOT_REQUEST:
      return { loading: true };
    case BOOK_DAY_SLOT_SUCCESS:
      return { loading: false, calenderDaySlotData: action.payload };
    case BOOK_DAY_SLOT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const slotBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_SLOT_REQUEST:
      return { loading: true };
    case BOOK_SLOT_SUCCESS:
      return { loading: false, success: true, bookedSlot: action.payload };
    case BOOK_SLOT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const dayBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DAY_REQUEST:
      return { loading: true };
    case BOOK_DAY_SUCCESS:
      return { loading: false, success: true, bookedDay: action.payload };
    case BOOK_DAY_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
