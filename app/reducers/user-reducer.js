const initialState = {
  user: null,
  isSignInPending: false,
  isCreatingPlan: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_OWN_USER_REQUESTED':
    case 'SIGN_IN_REQUESTED':
      return {
        ...state,
        isSignInPending: true,
      };
    case 'SIGN_IN_SUCCEEDED':
      return {
        ...state,
        isSignInPending: false,
        user: action.user,
      };
    case 'FETCH_OWN_USER_FAILED':
      return {
        ...state,
        isSignInPending: false,
      };
    case 'SIGN_IN_FAILED':
      return {
        ...state,
        isSignInPending: false,
        errorMessage: action.message,
      };

    case 'SIGN_OUT_REQUESTED':
      return {
        ...state,
        user: null,
      };

    case 'CREATE_PLAN_REQUESTED':
      return {
        ...state,
        isCreatingPlan: true,
      };
    case 'CREATE_PLAN_SUCCEEDED':
      return {
        ...state,
        isCreatingPlan: false,
        user: {
          ...state.user,
          plans: state.user.plans.concat([action.plan]),
        },
      };
    default:
      return state;
  }
}
