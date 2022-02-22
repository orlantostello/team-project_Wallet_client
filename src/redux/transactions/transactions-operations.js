import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getAllTransactions = createAsyncThunk('transactions/transactions/all', async () => {
  return await axios.get('/transactions');
});

const createTransactions = createAsyncThunk('transactions/transactions', async credentials => {
  return await axios.post('/transactions', credentials);
});

const getStatistics = createAsyncThunk('transactions/diagram', async (credentials = {}) => {
  const { searchParams } = credentials;

  if (!searchParams) {
    return await axios.get('/transactions/period');
  }

  const arrayParams = Object.entries(searchParams);
  const arrayKeyAndValue = arrayParams.map(el => {
    return el.join('=');
  });
  const stringParams = arrayKeyAndValue.join('&');

  return await axios.get(`/transactions/period?${stringParams}`);
});

const operations = {
  getAllTransactions,
  createTransactions,
  getStatistics,
};

export default operations;
