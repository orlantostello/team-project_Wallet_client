const getAllTransactions = state => state.transactions.transaction;
const getAllTransactionsError = state => state.transactions.errorTransaction;
const getAllisFetchingTransaction = state => state.transactions.isFetchingTransaction;
const createTransaction = state => state.transactions.created;
const createTransactionError = state => state.transactions.createdError;
const getIsFetchingCreate = state => state.transactions.isFetchingCreate;
const getStatistics = state => state.transactions.statistic;
const getStatisticsError = state => state.transactions.errorStatistic;
const getIsFetchingStatistic = state => state.transactions.isFetchingStatistic;

const transactionsSelectors = {
  getAllTransactions,
  getAllTransactionsError,
  getAllisFetchingTransaction,
  createTransaction,
  createTransactionError,
  getIsFetchingCreate,
  getStatistics,
  getStatisticsError,
  getIsFetchingStatistic,
};

export default transactionsSelectors;
