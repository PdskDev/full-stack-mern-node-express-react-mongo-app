import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const localUser = JSON.parse(localStorage.getItem('taskUser'));

const initialState = {
  user: localUser ? localUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
