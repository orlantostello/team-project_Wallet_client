import { useState } from 'react';
import { useSelector } from 'react-redux';
import useTableScreen from '../../hooks/UseTableScreen';
// import {authOperations} from '../../redux/auth/authOperations';
import usersSelectors from '../../redux/users/user-selectors';
import ModalLogout from '../ModalLogout';
import { Logo } from '../Svg/Logo';
import { Exit } from '../Svg/Exit';
import style from './Header.module.css';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(usersSelectors.getUser);
  const { name } = user;

  // const dispatch = useDispatch();
  const tableScreen = useTableScreen();

  function onOpenModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.logoBox}>
          <div className={style.logoBox}>
            <Logo s={style.logo} />
            <span className={style.logoName}>Wallet</span>
          </div>
        </div>
        <div className={style.userInfo}>
          <span className={style.userName}>{name}</span>

          <button className={style.logout} onClick={onOpenModal}>
            <Exit s={style.logoutSvg} />
            {Number(tableScreen) >= 768 && <span className={style.exit}>Exit</span>}
          </button>
        </div>
      </div>
      {showModal && <ModalLogout onCloseModal={onCloseModal} />}
    </div>
  );
};

export default Header;
