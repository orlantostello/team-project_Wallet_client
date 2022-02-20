import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const categories = createAsyncThunk('categories/categories', async credentials => {
  return await axios.get('/categories?lang=ru', credentials);
});

const operation = {
  categories,
};
export default operation;
