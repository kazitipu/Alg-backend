const INITIAL_STATE = { notices: [], intro: [] };

const setNoticesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_NOTICES":
      return { ...state, notices: [...action.payload] };
    case "GET_ALL_INTROS":
      return { ...state, intro: [...action.payload] };
    case "CREATE_NOTICE":
      return { ...state, notices: [action.payload, ...state.notices] };
    case "CREATE_INTRO":
      return { ...state, intro: [action.payload, ...state.intro] };
    case "UPDATE_NOTICE":
      const filteredNotices = state.notices.filter(
        (notice) => notice.id !== action.payload.id
      );
      return { ...state, notices: [action.payload, ...filteredNotices] };

    default:
      return { ...state };
  }
};
export default setNoticesReducer;
