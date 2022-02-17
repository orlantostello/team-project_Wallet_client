// import { useEffect, Suspense, lazy } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './views/loginView';
import Register from './views/registerView';
import Current from './views/currentViews';

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route exact path="/" element={<Navigate to="/current" />} />
          <Route exact path="/login" redirectTo="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/current"
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
