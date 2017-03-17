export const fetchOwnUser = () => ({
  type: 'FETCH_OWN_USER_REQUESTED',
});

export const signIn = (email, password) => ({
  type: 'SIGN_IN_REQUESTED',
  email,
  password,
});

export const signInSucceeded = user => ({
  type: 'SIGN_IN_SUCCEEDED',
  user,
});

export const signOut = () => ({
  type: 'SIGN_OUT_REQUESTED',
});

export const createNewPlan = (userId, name, startYear) => ({
  type: 'CREATE_PLAN_REQUESTED',
  userId,
  name,
  startYear,
});

export const createPlanSucceeded = plan => ({
  type: 'CREATE_PLAN_SUCCEEDED',
  plan,
});

export const createPlanFailed = error => ({
  type: 'CREATE_PLAN_FAILED',
  error,
});
