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