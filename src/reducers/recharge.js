const INITIAL_STATE = {
  rechargeRequestArray: [],
  rechargeHistoryArray: [],
  rechargeDaysArray: [],
};

const setRechargeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_RECHARGE_REQUEST":
      return { ...state, rechargeRequestArray: [...action.payload] };
    case "UPDATE_RECHARGE_REQUEST_STATUS":
      const filteredRechargeRequestArray = state.rechargeRequestArray.filter(
        (rechargeRequest) =>
          rechargeRequest.rechargeId !== action.payload.rechargeId
      );
      return {
        ...state,
        rechargeRequestArray: [action.payload, ...filteredRechargeRequestArray],
      };
    case "GET_ALL_RECHARGE_DAY":
      return { ...state, rechargeDaysArray: [...action.payload] };

    default:
      return { ...state };
  }
};
export default setRechargeReducer;
