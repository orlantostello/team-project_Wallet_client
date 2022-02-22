const getAllTransactions = state => state.transactions.transaction;
const getAllTransactionsError = state => state.transactions.errorTransaction;
const getAllisFetchingTransaction = state => state.transactions.isFetchingTransaction;
const createTransaction = state => state.transactions.created;
const createTransactionError = state => state.transactions.createdError;
const getStatistics = state => state.transactions.statistic;
const getStatisticsError = state => state.transactions.errorStatistic;
const getIsFetchingStatistic = state => state.transactions.isFetchingStatistic;

const transactionsSelectors = {
  getAllTransactions,
  getAllTransactionsError,
  getAllisFetchingTransaction,
  createTransaction,
  createTransactionError,
  getStatistics,
  getStatisticsError,
  getIsFetchingStatistic,
};

export default transactionsSelectors;
