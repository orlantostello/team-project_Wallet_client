import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { useIsMount } from '../../hooks/useIsMount';
import Header from './Header/Header';
import Item from './Item/Item';
import ButtonAddTransactions from '../ButtonAddTransactions';
import ModalAddTransaction from '../ModalAddTransaction';
import categoriesSelectors from '../../redux/categories/categories-selectors';
import transactionsSelectors from '../../redux/transactions/transactions-selectors';
import Loader from '../Loader/Loader';
import s from './List.module.css';

function List() {
  const [showModal, setShowModal] = useState(false);
  const isMount = useIsMount();

  const categories = useSelector(categoriesSelectors.getAllCategories);
  const data = useSelector(transactionsSelectors.getAllTransactions);
  const isLoading = useSelector(transactionsSelectors.getAllisFetchingTransaction);
  const dataError = useSelector(transactionsSelectors.getAllTransactionsError);
  const addTransaction = useSelector(transactionsSelectors.createTransaction);
  const addTransactionError = useSelector(transactionsSelectors.createTransactionError);
  const isLoadingCreate = useSelector(transactionsSelectors.getIsFetchingCreate);

  useEffect(() => {
    if (dataError) {
      toast.error('Произошла ошибка загрузки транзакций.', {
        toastId: 'custom-id-yes',
      });
    }
  }, [dataError]);

  useEffect(() => {
    if (isMount) {
      return;
    } else {
      if (addTransaction) {
        toast.success('Транзакция была успешно добавлена.', {
          toastId: 'custom-id-yes',
        });
      }
      if (addTransactionError) {
        toast.error('Произошла ошибка добавления транзакции.', {
          toastId: 'custom-id-yes',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTransaction, addTransactionError]);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {dataError && <ToastContainer autoClose={3000} position="top-center" theme="colored" />}
      {addTransaction && <ToastContainer autoClose={2000} position="top-center" theme="colored" />}
      {addTransactionError && (
        <ToastContainer autoClose={2000} position="top-center" theme="colored" />
      )}
      {isLoadingCreate && <Loader />}
      <ul className={s.List}>
        <div className={s.MiddleLine}></div>

        <Header />
        {data.length === 0 ? (
          <div className={s.noTransaction}>
            <p className={s.message}>
              У ВАС ПОКА НЕТ ТРАНЗАКЦИЙ, ДЛЯ ДОБАВЛЕНИЯ ТРАНЗАКЦИЙ НАЖМИТЕ КНОПКУ "+"
            </p>
          </div>
        ) : (
          <div className={s.TableList}>
            {[...data]
              .sort((a, b) => b.date - a.date)
              .map(elem => (
                <div key={elem._id} className={s.wrapper}>
                  <div className={elem.isIncome ? s.line_income : s.line_expenses}></div>
                  <Item elem={elem} categories={categories} />
                </div>
              ))}
          </div>
        )}
      </ul>

      <ButtonAddTransactions onOpenModal={onOpenModal} />
      {showModal && <ModalAddTransaction onCloseModal={onCloseModal} />}
    </>
  );
}

export default List;
