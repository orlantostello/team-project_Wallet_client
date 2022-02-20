import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getAllTransactions = createAsyncThunk('transactions/transactions/all', async credentials => {
  return await axios.get('/transactions', credentials);
});

const createTransactions = createAsyncThunk('transactions/transactions', async credentials => {
  return await axios.post('/transactions', credentials);
});

const getQueryStatistics = createAsyncThunk('transactions/diagram', async credentials => {
  return await axios.get('/transactions/period', credentials);
});

const operations = {
  getAllTransactions,
  createTransactions,
  getQueryStatistics,
};

export default operations;
