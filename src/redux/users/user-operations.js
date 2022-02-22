import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://afternoon-spire-55607.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

//  POST /users/signup
//  body: { name, email, password }
const register = createAsyncThunk('users/register', async credentials => {
  const result = await axios.post('/users/register', credentials);
  token.set(result.data.token);
  return result;
});

//  POST /users/login
//  body: { email, password }
const logIn = createAsyncThunk('users/login', async credentials => {
  const result = await axios.post('/users/login', credentials);
  token.set(result.data.token);
  return result;
});

//  POST /users/logout
//  headers: Authorization: Bearer token
const logOut = createAsyncThunk('users/logout', async () => {
  try {
    await axios.get('/users/logout');
    token.unset();
  } catch (error) {
    console.warn(error);
  }
});

//  GET /users/current
const fetchCurrentUser = createAsyncThunk('users/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.users.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue();
  }

  token.set(persistedToken);
  return await axios.get('/users/current');
});

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
