import { all } from 'redux-saga/effects';
import { AuthWatcher } from './auth/sagas';
import { WidgetsWatcher } from './widgets/sagas';

export function* rootSagaWatcher() {
  yield all([AuthWatcher(), WidgetsWatcher()]);
}
