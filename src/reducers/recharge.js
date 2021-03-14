const INITIAL_STATE = { rechargeRequestArray: [] };

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
    default:
      return { ...state };
  }
};
export default setRechargeReducer;
