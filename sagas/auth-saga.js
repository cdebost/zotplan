import { put, takeLatest, call } from 'redux-saga/effects';
import { push as redirect } from 'react-router';
import { signIn as apiSignIn } from './api.js';

function* signIn(action) {
    try {
        const user = yield call(apiSignIn, action.email, action.password);
        yield put({ type: 'SIGN_IN_SUCCEEDED', user });
    } catch (e) {
        yield put({ type: 'SIGN_IN_FAILED', message: e.message});
    }
}

export default function*() {
    yield takeLatest('SIGN_IN_REQUESTED', signIn);
}