const INITIAL_STATE = { ordersD2D: [], ordersFreight: [], ordersExpress: [] };

const setOrdersAlgReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS_D2D":
      return { ...state, ordersD2D: [...action.payload] };
    case "UPLOAD_ORDERS_D2D":
      return { ...state, ordersD2D: [...state.ordersD2D, action.payload] };
    case "UPDATE_ORDERS_D2D":
      const filteredLot = state.lots.filter(
        (lot) => lot.lotNo !== action.payload.lotNo
      );
      return { ...state, lots: [...filteredLot, action.payload] };
    default:
      return { ...state };
  }
};
export default setOrdersAlgReducer;
