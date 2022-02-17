import Media from "react-media";

import RegisterForm from "../../components/registerForm/registerForm";
import { ReactComponent as MainIcon } from "../../images/signupMainIcon.svg";
import { ReactComponent as WalletLogo } from "../../images/walletLogo.svg";

import s from "./registerView.module.css";

export default function RegisterView() {
  return (
    <Media query={{ maxWidth: 767 }}>
      {(matches) =>
        matches ? (
          <div className={s.formWrapper}>
            <WalletLogo className={s.logo} />

            <RegisterForm />
          </div>
        ) : (
          <div className={s.registerPage}>
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

                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Media>
  );
}
