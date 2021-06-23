const INITIAL_STATE = { orders: [], ordersExpress: [], orderObj: {} };

const setOrdersAlgReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return { ...state, orders: [...action.payload] };
    case "UPLOAD_ORDER":
      return {
        ...state,
        orders: action.payload
          ? [action.payload, ...state.orders]
          : [...state.orders],
      };
    case "UPDATE_ORDER":
      const updatedArray = state.orders.map((order) => {
        if (order.parcelId === action.payload.parcelId) {
          return action.payload;
        } else {
          return order;
        }
      });
      return {
        ...state,
        orders: updatedArray,
      };

    case "DELETE_SINGLE_ORDER":
      const filteredOrdersArray = state.orders.filter(
        (order) => order.cartonNo !== action.payload.cartonNo
      );
      return { ...state, orders: [...filteredOrdersArray] };
    case "GET_SINGLE_ORDER":
      return { ...state, orderObj: action.payload };
    case "GET_ALL_EXPRESS_ORDERS":
      return { ...state, ordersExpress: [...action.payload] };

    default:
      return { ...state };
  }
};
export default setOrdersAlgReducer;
