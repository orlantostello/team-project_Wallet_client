const getAllTransactions = state => state.transactions.transaction;
const getAllTransactionsError = state => state.transactions.errorTransaction;
const createTransaction = state => state.transactions.result;
const createTransactionError = state => state.transactions.errorTransaction;
const getStatistics = state => state.transactions.statistic;
const getStatisticsError = state => state.transactions.errorStatistic;

const transactionsSelectors = {
  getAllTransactions,
  getAllTransactionsError,
  createTransaction,
  createTransactionError,
  getStatistics,
  getStatisticsError,
};

export default transactionsSelectors;
