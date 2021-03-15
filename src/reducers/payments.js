const INITIAL_STATE = { paymentDaysArray: [], paymentHistoryArray: [] };

const setPaymentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_PAYMENT_DAY":
      return { ...state, paymentDaysArray: [...action.payload] };
    case "GET_ALL_PAYMENTS_OF_SINGLE_DAY":
      return { ...state, paymentHistoryArray: [...action.payload] };
    default:
      return { ...state };
  }
};
export default setPaymentsReducer;
