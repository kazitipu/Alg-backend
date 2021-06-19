const INITIAL_STATE = { admins: [], currentAdmin: null };

const setAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ALL_ADMINS":
      return { ...state, admins: [...action.payload] };

    case "SET_CURRENT_ADMIN":
      return { ...state, currentAdmin: action.payload };

    case "UPDATE_ADMIN":
      return { ...state, currentAdmin: action.payload };
    case "UPDATE_ADMIN_STATUS":
      const updatedAdminsArray = state.admins.map((admin) => {
        if (admin.adminId === action.payload.adminId) {
          return action.payload;
        } else {
          return admin;
        }
      });
      return { ...state, admins: updatedAdminsArray };
    default:
      return { ...state };
  }
};
export default setAdminsReducer;
