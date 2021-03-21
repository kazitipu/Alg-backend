const INITIAL_STATE = { refunds: [] };

const setRefundsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_REFUNDS":
      return { ...state, refunds: [...action.payload] };

    case "UPDATE_REFUND":
      const filteredRefund = state.refunds.filter(
        (refund) => refund.refundId !== action.payload.refundId
      );
      return { ...state, refunds: [action.payload, ...filteredRefund] };
    default:
      return { ...state };
  }
};
export default setRefundsReducer;
