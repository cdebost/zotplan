import { fork } from 'redux-saga/effects';
import auth from './auth-saga.js';

export default function* () {
    yield [
        fork(auth)
    ];
}