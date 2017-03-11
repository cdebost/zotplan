export const fetchOwnUser = () => {
    return {
        type: 'FETCH_OWN_USER_REQUESTED'
    };
};

export const signIn = (email, password, successCb, failureCb) => {
    return {
        type: 'SIGN_IN_REQUESTED',
        email,
        password
    };
};

export const signInSucceeded = (user) => {
    return {
        type: 'SIGN_IN_SUCCEEDED',
        user
    };
};

export const createNewPlan = (userId, name, startYear) => ({
    type: 'CREATE_PLAN_REQUESTED',
    userId,
    name,
    startYear
});

export const selectPlan = (plan) => ({
    type: 'SELECT_PLAN',
    plan
});