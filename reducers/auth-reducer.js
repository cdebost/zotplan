export default function authReducer(state = { user: null, isRequestPending: false }, action) {
    switch (action.type) {
        case 'SIGN_IN_REQUESTED':
            return {
                ...state,
                isRequestPending: true
            };
        case 'SIGN_IN_SUCCEEDED':
            return {
                ...state,
                isRequestPending: false,
                user: action.user
            };
        case 'SIGN_IN_FAILED':
            return {
                ...state,
                isRequestPending: false,
                errorMessage: action.message
            };
        default:
            return state;
    }
}