const initialState = {
    user: null,
    isSignInPending: false,
    isCreatingPlan: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_OWN_USER_REQUESTED':
        case 'SIGN_IN_REQUESTED':
            return {
                ...state,
                isSignInPending: true
            };
        case 'SIGN_IN_SUCCEEDED':
            return {
                ...state,
                isSignInPending: false,
                user: action.user
            };
        case 'FETCH_OWN_USER_FAILED':
            return {
                ...state,
                isSignInPending: false
            };
        case 'SIGN_IN_FAILED':
            return {
                ...state,
                isSignInPending: false,
                errorMessage: action.message
            };
        default:
            return state;
    }
}