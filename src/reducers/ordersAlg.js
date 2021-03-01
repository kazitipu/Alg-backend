const INITIAL_STATE = { orders: [], ordersExpress: [], orderObj: null };

const setOrdersAlgReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return { ...state, orders: [...action.payload] };
    case "UPLOAD_ORDER":
      return {
        ...state,
        orders: action.payload ? [...action.payload.orders] : [...state.orders],
      };
    case "UPDATE_ORDERS_D2D":
      const filteredLot = state.lots.filter(
        (lot) => lot.lotNo !== action.payload.lotNo
      );
      return { ...state, lots: [...filteredLot, action.payload] };
    case "DELETE_SINGLE_ORDER":
      const filteredOrdersArray = state.orders.filter(
        (order) => order.cartonNo !== action.payload.cartonNo
      );
      return { ...state, orders: [...filteredOrdersArray] };
    case "GET_SINGLE_ORDER":
      return { ...state, orderObj: action.payload };
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
