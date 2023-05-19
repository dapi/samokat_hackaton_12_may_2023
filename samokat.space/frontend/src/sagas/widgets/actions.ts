import { createAction } from '@reduxjs/toolkit';

export const GET_USER_WIDGETS = createAction('userWidgets/getAll');

export const ADD_USER_WIDGET = createAction('userWidgets/add', (id: number) => ({
  payload: { id },
}));

export const DELETE_USER_WIDGET = createAction('userWidgets/delete', (id: number) => ({
  payload: { id },
}));
