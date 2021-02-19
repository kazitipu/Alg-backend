const INITIAL_STATE = { d2dRates: [] };

const setD2DRatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_D2D_RATES":
      return { ...state, d2dRates: [...action.payload] };
    case "UPLOAD_D2D_RATES":
      return {
        ...state,
        d2dRates: [...state.d2dRates, action.payload],
      };
    case "UPDATE_D2D_RATES":
      const filteredD2DRatesArray = state.d2dRates.filter(
        (productType) => productType.id !== action.payload.id
      );

      return {
        ...state,
        d2dRates: [...filteredD2DRatesArray, action.payload],
      };
    case "DELETE_D2D_RATES":
      const updatedD2DRatesArray = state.d2dRates.filter(
        (productType) => productType.id !== action.payload.id
      );
      return {
        ...state,
        d2dRates: [...updatedD2DRatesArray],
      };
    default:
      return { ...state };
  }
};
export default setD2DRatesReducer;
