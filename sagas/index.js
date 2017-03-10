import { fork } from 'redux-saga/effects';
import user from './user-saga.js';

export default function* () {
    yield [
        fork(user)
    ];
}