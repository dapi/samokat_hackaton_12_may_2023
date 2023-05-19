import { call, put, takeLatest } from 'redux-saga/effects';
import { httpClient } from '../../services/HttpClient';
import { ADD_USER_WIDGET, DELETE_USER_WIDGET, GET_USER_WIDGETS } from './actions';
import { setError, setLoading, setUserWidgets } from '../../redux/slices/userWidgets/slice';

function* getUserWidgets() {
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.get, 'users/current');
    yield put(setUserWidgets(data.widgets));
  } catch (error) {
    yield put(setError(error));
  }
}

function* addUserWidget(action: any) {
  const { id } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.post, `widgets/linkWithUser/${id}`);
    yield put(setUserWidgets(data.widgets));
  } catch (error) {
    yield put(setError(error));
  }
}

function* deleteUserWidget(action: any) {
  const { id } = action.payload;
  try {
    yield put(setLoading());
    const { data } = yield call(httpClient.post, `widgets/unlinkFromUser/${id}`);
    yield put(setUserWidgets(data.widgets));
  } catch (error) {
    yield put(setError(error));
  }
}

export function* WidgetsWatcher() {
  yield takeLatest(GET_USER_WIDGETS.type, getUserWidgets);
  yield takeLatest(ADD_USER_WIDGET.type, addUserWidget);
  yield takeLatest(DELETE_USER_WIDGET.type, deleteUserWidget);
}
