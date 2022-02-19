import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LeftBar from '../LeftBar';
import Rate from '../Rate';
import List from '../List/List'
import Diagram from '../Diagram/DiagramTab'
import ModalAddTransaction from '../ModalAddTransaction';
import ButtonAddTransactions from '../ButtonAddTransactions';
import s from './Body.module.css';

function Body() {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className={s.container}>
      <LeftBar />
      <ButtonAddTransactions onOpenModal={onOpenModal} />
      {showModal && <ModalAddTransaction onCloseModal={onCloseModal} />}
        <Routes>
          <Route exact path="" element={<List/>} />
          <Route exact path="diagram" element={<Diagram/>} />
          <Route exact path="rate" element={<Rate />} />
        </Routes>
    </div>
  );
}
export default Body;
