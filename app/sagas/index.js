import { fork } from 'redux-saga/effects';
import user from './user-saga';

export default function* () {
  yield [
    fork(user),
  ];
}
