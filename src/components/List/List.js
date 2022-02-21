import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './Header/Header';
import Item from './Item/Item';
import ButtonAddTransactions from '../ButtonAddTransactions';
import ModalAddTransaction from '../ModalAddTransaction';
import categoriesSelectors from '../../redux/categories/categories-selectors';
import transactionsSelectors from '../../redux/transactions/transactions-selectors';
import s from './List.module.css';

function List() {
  const [showModal, setShowModal] = useState(false);

  const categories = useSelector(categoriesSelectors.getAllCategories);
  const data = useSelector(transactionsSelectors.getAllTransactions);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <ul className={s.list}>
        <Header />
        {data && data.map(elem => <Item key={elem._id} elem={elem} categories={categories} />)}
      </ul>
      <ButtonAddTransactions onOpenModal={onOpenModal} />
      {showModal && <ModalAddTransaction onCloseModal={onCloseModal} />}
    </>
  );
}

export default List;
