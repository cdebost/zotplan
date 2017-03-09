import { put, takeLatest, call } from 'redux-saga/effects';
import { push as redirect } from 'react-router';

const Api = {
    signIn: function (email, password) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open("POST", "/api/auth/zotplan");
            req.setRequestHeader("Content-Type", "application/json");
            req.onload = function () {
                if (req.status !== 200) {
                    const response = JSON.parse(req.response);
                    return reject(new Error(response.error));
                }
                resolve(JSON.parse(req.response));
            };
            req.onerror = function () {
                reject(new Error(req.response));
            }
            req.send(JSON.stringify({ email, password }));
        });
    }
}

function* signIn(action) {
    try {
        const user = yield call(Api.signIn, action.email, action.password);
        yield put({ type: 'SIGN_IN_SUCCEEDED', user });
    } catch (e) {
        yield put({ type: 'SIGN_IN_FAILED', message: e.message});
    }
}

export default function*() {
    yield takeLatest('SIGN_IN_REQUESTED', signIn);
}