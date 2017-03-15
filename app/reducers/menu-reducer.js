const initialState = {
  isVisible: false,
  isUserHeaderExpanded: false,
  isPlansExpanded: false,
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
    case 'TOGGLE_USER_HEADER_EXPANDED':
      return {
        ...state,
        isUserHeaderExpanded: !state.isUserHeaderExpanded,
      };
    case 'TOGGLE_PLANS_EXPANDED':
      return {
        ...state,
        isPlansExpanded: !state.isPlansExpanded,
      };
    default:
      return state;
  }
}
