import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = 'https://afternoon-spire-55607.herokuapp.com';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

const getAllTransactions = createAsyncThunk(
  "transactions/transactions",
  async (credentials) => {
    return await axios.get("/transactions", credentials);
  }
);

const createTransactions = createAsyncThunk(
  "transactions/transactions",
  async (credentials) => {
    return await axios.post("/transactions", credentials);
  }
);

const getQueryStatistics = createAsyncThunk(
  "transactions/statistics",
  async (credentials) => {
    return await axios.get("/transactions/statistics", credentials);
  }
);

const operations = {
  getAllTransactions,
  createTransactions,
  getQueryStatistics,
};

export default operations;
