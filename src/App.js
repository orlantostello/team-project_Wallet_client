import { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader/Loader';
import { usersOperations } from './redux/users';

const Login = lazy(() => import('./views/loginView' /* webpackChunkName: "login-page" */));
const Register = lazy(() => import('./views/registerView' /* webpackChunkName: "register-page" */));
const Current = lazy(() => import('./views/currentViews' /* webpackChunkName: "home-page" */));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route>
            <Route exact="true" path="/" element={<Navigate to="/current" />} />
            <Route path="*" element={<Navigate to="/current" />} />
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
      </Suspense>
    </Router>
  );
}

export default App;
