import { useState } from 'react';
import { useSelector } from 'react-redux';
import usersSelectors from '../../redux/users/user-selectors';
import ModalLogout from '../ModalLogout';
import { Logo } from '../Svg/Logo';
import { LogoName } from '../Svg/LogoName';
import { Exit } from '../Svg/Exit';
import style from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector(usersSelectors.getUser);
  const { name } = user;

  function onOpenModal() {
    setShowModal(true);
  }

  function onCloseModal() {
    setShowModal(false);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Link to="" className={style.logoBox}>
          <Logo s={style.logo} />
          <LogoName s={style.logoNameVector} />
        </Link>
        <div className={style.userInfo}>
        <span className={style.userName}>{name}</span>

        <button className={style.logout} onClick={onOpenModal}>
          <Exit s={style.logoutSvg} />
          <span className={style.exit}>Exit</span>
        </button>
        </div>
      </div>
      {showModal && <ModalLogout onCloseModal={onCloseModal} />}
    </div>
  );
};

export default Header;
