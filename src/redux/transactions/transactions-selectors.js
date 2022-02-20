const getAllTransactions = state => state.transactions.transaction;
const getAllTransactionsError = state => state.transactions.error;
const createTransaction = state => state.transactions.result;
const createTransactionError = state => state.transactions.error;
const getQueryStatistics = state => state.transactions.statistic;
const getQueryStatisticsError = state => state.transactions.error;

const transactionsSelectors = {
  getAllTransactions,
  getAllTransactionsError,
  createTransaction,
  createTransactionError,
  getQueryStatistics,
  getQueryStatisticsError,
};

export default transactionsSelectors;
