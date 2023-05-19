import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type WidgetType = {
  id: number;
  name: string;
  description: string;
};

interface IUserWidgetState {
  widgets: WidgetType[];
  loading: boolean;
  error: Error | null;
}

export const initialState: IUserWidgetState = {
  widgets: [],
  loading: false,
  error: null,
};

const userWidgetsSlice = createSlice({
  name: 'userWidgets',
  initialState,
  reducers: {
    setUserWidgets: (state, action: PayloadAction<WidgetType[]>) => {
      state.widgets = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.widgets = [];
      state.loading = false;
    },
  },
});

export const { setUserWidgets, setLoading, setError } = userWidgetsSlice.actions;

export const userWidgetsReducer = userWidgetsSlice.reducer;
