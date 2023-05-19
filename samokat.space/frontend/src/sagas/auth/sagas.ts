import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../services/HttpClient';
import { SIGNIN } from './actions';
import { setCurrentUser, setError, setLoading } from '../../redux/slices/currentUser/slice';

function* signin(action: any) {
  const { email, password } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.post, `auth/login`, { email, password });
    yield put(setCurrentUser(data));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* AuthWatcher() {
  yield takeLatest(SIGNIN.type, signin);
}
