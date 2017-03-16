const initialState = {
  isVisible: false,
  isSignOutDialogVisible: false,
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case 'CLOSE_MENU':
      return {
        ...state,
        isVisible: false,
      };
    case 'OPEN_SIGN_OUT_DIALOG':
      return {
        ...state,
        isSignOutDialogVisible: true,
      };
    case 'CLOSE_SIGN_OUT_DIALOG':
      return {
        ...state,
        isSignOutDialogVisible: false,
      };
    default:
      return state;
  }
}
