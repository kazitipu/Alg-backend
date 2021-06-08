const INITIAL_STATE = { bookings: [], bookingObj: null };

const setBookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_BOOKINGS":
      return { ...state, bookings: [...action.payload] };
    case "GET_SINGLE_BOOKING":
      return { ...state, bookingObj: action.payload };
    // case "UPLOAD_LOT":
    //   return { ...state, lots: [...state.lots, action.payload] };
    case "UPDATE_BOOKING":
      const filteredBooking = state.bookings.filter(
        (booking) => booking.bookingId !== action.payload.bookingId
      );

      return { ...state, bookings: [...filteredBooking] };
    default:
      return { ...state };
  }
};
export default setBookingsReducer;
