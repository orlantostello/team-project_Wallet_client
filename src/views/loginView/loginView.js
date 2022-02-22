import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { usersSelectors } from '../../redux/users';
import useMediaQuery from '../../hooks/useMediaQuery';
import LoginForm from '../../components/loginForm/loginForm';
import { ReactComponent as MainIcon } from '../../images/loginMainIcon.svg';
import { ReactComponent as WalletLogo } from '../../images/walletLogo.svg';

import s from './loginView.module.css';

export default function LoginView({ redirectTo = '/' }) {
  const isLoggedIn = useSelector(usersSelectors.getIsLoggedIn);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return isLoggedIn ? (
    <Navigate to={redirectTo} />
  ) : (
    <>
      {isMobile ? (
        <div className={s.formWrapper}>
          <WalletLogo className={s.logo} />

          <LoginForm />
        </div>
      ) : (
        <div className={s.loginPage}>
          <div className={s.ellipseOrange}></div>

          <div className={s.ellipseViolet}></div>

          <div className={s.mainWrapper}>
            <div className={s.titleWrapper}>
              <MainIcon className={s.mainIcon} />

              <h1 className={s.title}>Finance App</h1>
            </div>

            <div className={s.parentFormWrapper}>
              <div className={s.formWrapper}>
                <WalletLogo className={s.logo} />

                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
