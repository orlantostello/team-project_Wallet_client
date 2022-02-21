import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './views/loginView';
import Register from './views/registerView';
import Current from './views/currentViews';
import { usersOperations } from './redux/users';
import { categoriesOperations } from './redux/categories';
import { transactionsOperations } from './redux/transactions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersOperations.fetchCurrentUser());
    dispatch(categoriesOperations.categories({ searchParams: { lang: 'ru' } }));
    dispatch(transactionsOperations.getAllTransactions());
  }, [dispatch]);

  return ( 
      <Router>
        <Routes>
          <Route>
            <Route exact="true" path="/" element={<Navigate to="/current" />} />
            <Route exact="true" path="/login" redirectTo="/current" element={<Login />} />
            <Route exact="true" path="/register" redirectTo="/current" element={<Register />} />
            <Route
              exact="true"
              path="current/*"
              element={
                <PrivateRoute redirectTo="/login">
                  <Current />
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Routes>
        </Router>
  );
}

export default App;
