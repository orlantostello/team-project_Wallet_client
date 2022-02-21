import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const categories = createAsyncThunk('categories/categories', async (credentials = {}) => {
  const { searchParams } = credentials;

  if (!searchParams) {
    return await axios.get('/categories');
  }

  const arrayParams = Object.entries(searchParams);
  const arrayKeyAndValue = arrayParams.map(el => {
    return el.join('=');
  });
  const stringParams = arrayKeyAndValue.join('&');

  return await axios.get(`/categories?${stringParams}`);
});

const operation = {
  categories,
};
export default operation;
