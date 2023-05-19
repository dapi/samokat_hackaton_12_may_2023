import { createAction } from '@reduxjs/toolkit';

export const SIGNIN = createAction('auth/login', (email: string, password: string) => ({
  payload: { email, password },
}));
