import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { useDispatch } from 'react-redux';
import { rootSagaWatcher } from '../sagas';
import { currentUserReducer } from './slices/currentUser/slice';
import { userWidgetsReducer } from './slices/userWidgets/slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    userWidgets: userWidgetsReducer,
  },
  middleware: [sagaMiddleware],
});

//Сага должна зпускаться только после создания store
sagaMiddleware.run(rootSagaWatcher);

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
