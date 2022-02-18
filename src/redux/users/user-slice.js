import { createSlice } from '@reduxjs/toolkit';
import userOperations from './user-operations';

const initialState = {
  user: { name: null, email: null, balance: null },
  token: null,
  error: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [userOperations.register.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
      state.error = null;
    },
    [userOperations.register.rejected](state, action) {
      state.error = action.error.message;
      state.isLoggedIn = false;
      state.isFetchingCurrentUser = false;
    },
    [userOperations.register.pending](state) {
      state.isFetchingCurrentUser = true;
    },

    [userOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
      state.error = null;
    },
    [userOperations.logIn.rejected](state, action) {
      state.error = action.error.message;
      state.isLoggedIn = false;
      state.isFetchingCurrentUser = false;
    },
    [userOperations.logIn.pending](state) {
      state.isFetchingCurrentUser = true;
    },

    [userOperations.logOut.fulfilled](state) {
      state.user = { name: null, email: null, balance: null };
      state.token = null;
      state.isLoggedIn = false;
    },

    [userOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload.data.user;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
      state.error = null;
    },
    [userOperations.fetchCurrentUser.rejected](state, action) {
      state.error = action.error.message;
      state.isLoggedIn = false;
      state.isFetchingCurrentUser = false;
    },
    [userOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
  },
});

export default usersSlice.reducer;
