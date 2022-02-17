import s from './ButtonAddTransactions.module.css';
import plusbtn from '../ModalAddTransaction/plusbtn.svg';

function ButtonAddTransactions({ onOpenModal }) {
  return (
    <>
      <button className={s.addplusbtn} type="button" onClick={onOpenModal}>
        <img src={plusbtn} className={s.plusbtn} alt="plusbtn" />
      </button>
    </>
  );
}

export default ButtonAddTransactions;
