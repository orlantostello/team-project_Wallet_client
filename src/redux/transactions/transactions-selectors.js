const getAllTransactions = state => state.transactions.transaction;
const getAllTransactionsError = state => state.transactions.error;
const createTransaction = state => state.transactions.result;
const createTransactionError = state => state.transactions.error;
const getStatistics = state => state.transactions.statistic;
const getStatisticsError = state => state.transactions.error;

const transactionsSelectors = {
  getAllTransactions,
  getAllTransactionsError,
  createTransaction,
  createTransactionError,
  getStatistics,
  getStatisticsError,
};

export default transactionsSelectors;
