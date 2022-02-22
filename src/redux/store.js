import {
  configureStore,
  // getDefaultMiddleware
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { usersReducer } from './users';
import { categoriesReducer } from './categories';
import { transactionsReducer } from './transactions';

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// ];

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['token'],
};

// const categoriesPersistConfig = {
//   key: 'categories',
//   storage,
//   whitelist: ['token'],
// };

// const transactionsPersistConfig = {
//   key: 'transactions',
//   storage,
//   whitelist: ['token'],
// };

export const store = configureStore({
  reducer: {
    users: persistReducer(usersPersistConfig, usersReducer),
    categories: categoriesReducer,
    transactions: transactionsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
