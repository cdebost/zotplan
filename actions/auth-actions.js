export const signIn = (email, password, successCb, failureCb) => {
    return {
        type: 'SIGN_IN_REQUESTED',
        email,
        password
    };
}