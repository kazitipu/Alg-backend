const INITIAL_STATE = { lots: [] };

const setLotsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_LOTS":
      return { ...state, lots: [...action.payload] };
    case "UPLOAD_LOT":
      return { ...state, lots: [...state.lots, action.payload] };
    case "UPDATE_LOT":
      const filteredLot = state.lots.filter(
        (lot) => lot.lotNo !== action.payload.lotNo
      );
      return { ...state, lots: [...filteredLot, action.payload] };
    default:
      return { ...state };
  }
};
export default setLotsReducer;
