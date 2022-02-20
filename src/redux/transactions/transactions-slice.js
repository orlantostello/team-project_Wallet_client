import { createSlice } from '@reduxjs/toolkit';
import transactionsOperations from './transactions-operations';

const initialState = {
  transaction: [],
  errorTransaction: false,
  isFetchingTransaction: false,

  statistic: {},
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
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },
    [transactionsOperations.createTransactions.rejected](state) {
      state.isFetchingTransaction = false;
      state.errorTransaction = true;
    },
    [transactionsOperations.createTransactions.pending](state) {
      state.isFetchingTransaction = true;
    },

    [transactionsOperations.getQueryStatistics.fulfilled](state, action) {
      state.statistic = action.payload.data.statistic;
      state.isFetchingStatistic = false;
      state.errorStatistic = false;
    },

    [transactionsOperations.getQueryStatistics.rejected](state) {
      state.isFetchingStatistic = false;
      state.errorStatistic = true;
    },
    [transactionsOperations.getQueryStatistics.pending](state) {
      state.isFetchingStatistic = true;
    },
  },
});

export default transactionsSlice.reducer;
