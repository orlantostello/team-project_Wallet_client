import s from './Balance.module.css';

function Balance() {
  return (
    <div className={s.Balance}>
      <div className={s.BalanceName}>ВАШ БАЛАНС</div>
      <div className={s.BalanceValue}>₴ 24 000.00</div>
    </div>
  );
}

export default Balance;
