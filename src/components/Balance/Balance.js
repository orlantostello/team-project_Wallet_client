import { useSelector } from 'react-redux';

import usersSelectors from '../../redux/users/user-selectors';
import s from './Balance.module.css';

function Balance() {
  const user = useSelector(usersSelectors.getUser);
  const { balance } = user;
  const balanceToString = Math.trunc(balance).toLocaleString();

  return (
    <div className={s.Balance}>
      <div className={s.BalanceName}>ВАШ БАЛАНС</div>
      <div className={s.BalanceValue}>
        ₴<span className={s.BalanceText}>{balanceToString}.00</span>
      </div>
    </div>
  );
}

export default Balance;
