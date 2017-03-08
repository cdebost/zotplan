export default function menuReducer(state = { isVisible: false }, action) {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return Object.assign({}, state, { isVisible: !state.isVisible });
        case 'CLOSE_MENU':
            return Object.assign({}, state, { isVisible: false });
        default:
            return state;
    }
}