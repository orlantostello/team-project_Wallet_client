import Media from "react-media";

import LoginForm from "../../components/loginForm/loginForm";
import { ReactComponent as MainIcon } from "../../images/loginMainIcon.svg";
import { ReactComponent as WalletLogo } from "../../images/walletLogo.svg";

import s from "./loginView.module.css";

export default function LoginView() {
  return (
    <Media query={{ maxWidth: 767 }}>
      {(matches) =>
        matches ? (
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
        )
      }
    </Media>
  );
}
