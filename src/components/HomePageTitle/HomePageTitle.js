import {useDispatch, useSelector} from 'react-redux';
import useTableScreen from '../../hooks/UseTableScreen';
import {authOperations} from '../../redux/auth/authOperations';
import {userNameSelector} from '../../redux/auth/authSelectors';
import {Logo} from '../Svg/Logo';
import {Exit} from '../Svg/Exit';
import style from './HomePageTitle.module.css';

const HomePageTitle = () => {
  const name = "ivan";
  // useSelector(userNameSelector);
  // const dispatch = useDispatch();
  const tableScreen = useTableScreen();

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

          <button
            className={style.logout}
            onClick={e => alert('I am logging out from account')
              // dispatch(authOperations.logOut())
            }
          >
            <Exit s={style.logoutSvg} />
            {Number(tableScreen) >= 768 && (
              <span className={style.exit}>Exit</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageTitle;