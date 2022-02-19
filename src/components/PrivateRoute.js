import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usersSelectors } from '../redux/users';

export default function PrivateRoute({ children, redirectTo = '/' }) {
  const isLoggedIn = useSelector(usersSelectors.getIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
