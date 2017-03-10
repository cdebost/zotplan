import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { push as redirect } from 'react-router';
import * as Api from './api.js';

function* fetchOwnUser(action) {
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
        yield put({ type: 'SIGN_IN_FAILED', message: JSON.stringify(e).message});
    }
}

export default function*() {
    yield takeLatest('FETCH_OWN_USER_REQUESTED', fetchOwnUser);
    yield takeLatest('SIGN_IN_REQUESTED', signIn);
}