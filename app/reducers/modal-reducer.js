export default function modalReducer(state = { modals: [] }, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        modals: state.modals.concat([{
          ...action,
          type: undefined,
        }]),
      };
    case 'CLOSE_MODAL':
      if (state.modals.length) {
        return {
          ...state,
          modals: state.modals.slice(1, state.modals.length),
        };
      }
      return state;
    default:
      return state;
  }
}
