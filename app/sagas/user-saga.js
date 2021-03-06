import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as Api from './api';

function* fetchOwnUser() {
  try {
    const user = yield call(Api.fetchOwnUser);
    yield put({ type: 'SIGN_IN_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'FETCH_OWN_USER_FAILED' });
  }
}

function* signIn(action) {
  try {
    const user = yield call(Api.signIn, action.email, action.password);
    yield put({ type: 'SIGN_IN_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'SIGN_IN_FAILED', message: e.message });
  }
}

function* signOut() {
  try {
    yield call(Api.signOut);
  } catch (e) {
    // No need to do anything
  }
}

function* createPlan(action) {
  try {
    const plan = yield call(Api.createPlan, action.userId, action.name, action.startYear);
    yield put({ type: 'CREATE_PLAN_SUCCEEDED', plan });
  } catch (e) {
    yield put({ type: 'CREATE_PLAN_FAILED', error: JSON.stringify(e).message });
  }
}

export default function* () {
  yield takeLatest('FETCH_OWN_USER_REQUESTED', fetchOwnUser);
  yield takeLatest('SIGN_IN_REQUESTED', signIn);
  yield takeLatest('SIGN_OUT_REQUESTED', signOut);
  yield takeEvery('CREATE_PLAN_REQUESTED', createPlan);
}
