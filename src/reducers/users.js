const INITIAL_STATE = {
  users: [],
  parcelsArray: [],
  bookingsArray: [],
  rechargesArray: [],
};

const setUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { ...state, users: [...action.payload] };
    case "RECHARGE_USER":
      const filteredUsers = state.users.filter(
        (user) => user.uid !== action.payload.uid
      );

      return {
        ...state,
        users: [action.payload, ...filteredUsers],
      };
    case "UPDATE_USER_STATUS":
      const filterUsers = state.users.filter(
        (user) => user.uid !== action.payload.uid
      );
      return {
        ...state,
        users: [action.payload, ...filterUsers],
      };

    case "GET_ALL_BOOKINGS_OF_SINGLE_USER":
      return {
        ...state,
        bookingsArray: action.payload,
      };
    case "GET_ALL_PARCELS_OF_SINGLE_USER":
      return {
        ...state,
        parcelsArray: action.payload,
      };
    case "GET_ALL_RECHARGE_REQUEST_OF_SINGLE_USER":
      return {
        ...state,
        rechargesArray: action.payload,
      };

    default:
      return { ...state };
  }
};
export default setUsersReducer;
