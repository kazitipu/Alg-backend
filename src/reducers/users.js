const INITIAL_STATE = { users: [] };

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

    default:
      return { ...state };
  }
};
export default setUsersReducer;
