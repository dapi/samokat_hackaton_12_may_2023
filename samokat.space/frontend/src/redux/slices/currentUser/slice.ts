import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserInfoType = {
  name: string;
  email: string;
  jobTitle: string;
  imgUrl: string;
  access_token: string;
};

interface ICurrentUserState {
  user: UserInfoType;
  loading: boolean;
  error: Error | null;
}

export const userInfoInitialState: UserInfoType = {
  name: '',
  email: '',
  jobTitle: '',
  imgUrl: '',
  access_token: '',
};

export const initialState: ICurrentUserState = {
  user: userInfoInitialState,
  loading: false,
  error: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserInfoType>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('access-token', action.payload.access_token);
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      localStorage.removeItem('access-token');
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.user = userInfoInitialState;
      state.loading = false;
      localStorage.removeItem('access-token');
    },
  },
});

export const { setCurrentUser, setLoading, setError } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
