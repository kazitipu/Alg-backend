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
    case "GET_ALL_EXPRESS_ORDERS":
      return { ...state, ordersExpress: [...action.payload] };
    // case "UPDATE_EXPRESS_ORDER_STATUS":
    //   const filteredExpressOrder = state.orderExpress.find(order=>order.month === payload.month)
    //   const c
    //   return {...state, ordersExpress:[]}
    default:
      return { ...state };
  }
};
export default setOrdersAlgReducer;
