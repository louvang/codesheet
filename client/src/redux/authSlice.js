import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserPromise } from './authAPI.js';

const initialState = {
  userData: null,
  status: 'idle',
  error: null,
};

// Async thunk for checking if user is logged in
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await fetchUserPromise();
  return res; // the payload that will put into userData state
});

// Slice with our actions that will update state
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, payload) => {
      state.userData = payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userData = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { setUserData } = authSlice.actions;

export const selectUserData = (state) => state.auth.userData;
export const selectAuthStatus = (state) => state.auth.status;

export default authSlice.reducer;
