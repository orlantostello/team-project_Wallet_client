import s from './Body.module.css';
import LeftBar from '../LeftBar';
import Rate from '../Rate';
import List from '../List/List';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ModalAddTransaction from '../ModalAddTransaction';
import ButtonAddTransactions from '../ButtonAddTransactions';

function Body() {
  const [showModal, setShowModa] = useState(false);

  const onOpenModal = () => {
    setShowModa(true);
  };

  const onCloseModal = () => {
    setShowModa(false);
  };
  return (
    <div className={s.container}>
      <LeftBar />
      <ButtonAddTransactions onOpenModal={onOpenModal} />
      {showModal && <ModalAddTransaction onCloseModal={onCloseModal} />}

      <Routes>
        <Route exact path="" element={<List />} />
        <Route exact path="diagram" element={<h1>Это диаграмма</h1>} />
        <Route exact path="rate" element={<Rate />} />
      </Routes>
    </div>
  );
}
export default Body;
