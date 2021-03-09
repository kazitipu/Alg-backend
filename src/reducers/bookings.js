const INITIAL_STATE = { bookings: [] };

const setBookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_BOOKINGS":
      return { ...state, bookings: [...action.payload] };
    // case "UPLOAD_LOT":
    //   return { ...state, lots: [...state.lots, action.payload] };
    case "UPDATE_BOOKING":
      const filteredBooking = state.bookings.filter(
        (booking) => booking.bookingId !== action.payload.bookingId
      );
      return { ...state, bookings: [...filteredBooking, action.payload] };
    default:
      return { ...state };
  }
};
export default setBookingsReducer;