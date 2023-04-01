export const actionType = {
  SET_USER: "SET_USER",
  SET_USER_DISPLAY_NAME: "SET_USER_DISPLAY_NAME",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_USER_DISPLAY_NAME:
      return {
        ...state,
        displayName: action.displayName,
      };

    default:
      return state;
  }
};

export default reducer;
