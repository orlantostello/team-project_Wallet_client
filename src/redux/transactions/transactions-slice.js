import { createSlice } from "@reduxjs/toolkit";
import transactionsOperations from "./transactions-operations";

const initialState = {
  transaction: [],
  errorTransaction: false,
  isFetchingTransaction: false,

  statistic: {},
  errorStatistic: false,
  isFetchingStatistic: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: {
    [transactionsOperations.getAllTransactions.fulfilled](state, action) {
      state.transactions = action.payload.data.transaction;
      state.token = action.payload.data.token;
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },

    [transactionsOperations.getAllTransactions.rejected](state) {
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },
    [transactionsOperations.getAllTransactions.pending](state) {
      state.isFetchingTransaction = true;
    },

    [transactionsOperations.createTransactions.fulfilled](state, action) {
      state.transactions = action.payload.data.transaction;
      state.token = action.payload.data.token;
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },

    [transactionsOperations.createTransactions.rejected](state) {
      state.isFetchingTransaction = false;
      state.errorTransaction = false;
    },
    [transactionsOperations.createTransactions.pending](state) {
      state.isFetchingTransaction = true;
    },

    [transactionsOperations.getQueryStatistics.fulfilled](state, action) {
      state.transactions = action.payload.data.statistic;
      state.token = action.payload.data.token;
      state.isFetchingStatistic = false;
      state.errorStatistic = false;
    },

    [transactionsOperations.getQueryStatistics.rejected](state) {
      state.isFetchingStatistic = false;
      state.errorStatistic = false;
    },
    [transactionsOperations.getQueryStatistics.pending](state) {
      state.isFetchingStatistic = true;
    },
  },
});

export default transactionsSlice.slice;
