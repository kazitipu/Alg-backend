const INITIAL_STATE = { rechargeRequestArray: [] };

const setRechargeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_RECHARGE_REQUEST":
      return { ...state, rechargeRequestArray: [...action.payload] };
    default:
      return { ...state };
  }
};
export default setRechargeReducer;
