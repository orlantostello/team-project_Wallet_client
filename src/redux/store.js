import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { tickersReducer } from './tickers';
import { usersReducer } from './users';
import {categoriesReduser} from './categories';
import {transactionsSlice } from './transactions';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['token'],
};

const categoriesPersistConfig = {
  key: 'categories',
  storage,
  whitelist: ['token'],
};

const transactionsPersistConfig = {
  key: 'transactions',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
  users: persistReducer(usersPersistConfig, usersReducer),
  categories: persistReducer(categoriesPersistConfig, categoriesReduser),
  transactions: persistReducer(transactionsPersistConfig, transactionsSlice),
  // transactions: persistReducer(transactionsPersistConfig, transactionsReducer),
    // tickers: tickersReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
