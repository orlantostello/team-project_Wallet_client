import { createSlice } from '@reduxjs/toolkit';
import transactionsOperations from './transactions-operations';

const initialState = {
  transaction: [],
  errorTransaction: false,
  isFetchingTransaction: false,

  created: false,
  createdError: false,
  isFetchingCreate: false,

  statistic: {
    totalExpenditures: '0',
    totalIncome: '0',
    categories: {
      1: '0',
      2: '0',
      3: '0',
      4: '0',
      5: '0',
      6: '0',
      7: '0',
      8: '0',
      9: '0',
      10: '0',
      11: '0',
    },
  },
  errorStatistic: false,
  isFetchingStatistic: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: {
    [transactionsOperations.getAllTransactions.fulfilled](state, action) {
      state.transaction = action.payload.data;
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },
    [transactionsOperations.getAllTransactions.rejected](state) {
      state.isFetchingTransaction = false;
      state.errorTransaction = true;
    },
    [transactionsOperations.getAllTransactions.pending](state) {
      state.isFetchingTransaction = true;
    },

    [transactionsOperations.createTransactions.fulfilled](state, action) {
      state.transaction = [...state.transaction, action.payload.data];
      state.created = true;
      state.isFetchingCreate = false;
      state.createdError = false;
    },
    [transactionsOperations.createTransactions.rejected](state) {
      state.created = false;
      state.isFetchingCreate = false;
      state.createdError = true;
    },
    [transactionsOperations.createTransactions.pending](state) {
      state.created = false;
      state.isFetchingCreate = true;
    },

    [transactionsOperations.getStatistics.fulfilled](state, action) {
      state.statistic = action.payload.data;
      state.isFetchingStatistic = false;
      state.errorStatistic = false;
    },
    [transactionsOperations.getStatistics.rejected](state) {
      state.isFetchingStatistic = false;
      state.errorStatistic = true;
    },
    [transactionsOperations.getStatistics.pending](state) {
      state.isFetchingStatistic = true;
    },
  },
});

export default transactionsSlice.reducer;
