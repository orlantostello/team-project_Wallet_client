// import React, { useEffect, useState } from 'react';
// import { useState } from 'react';
// import { Button } from '@mui/material';
// import ModalLogout from '../ModalLogout';
// import Modal from '../Modal';
// import ModalAddTransaction from '../ModalAddTransaction';
// import ButtonAddTransactions from '../ButtonAddTransactions';
// import plusbtn from '../ModalAddTransaction/plusbtn.svg';
import MobileModalAddTransaction from '../MobileModalAddTransaction';

function TestModalComponent() {
  // const [showModal, setShowModa] = useState(false);

  // const onOpenModal = () => {
  //   setShowModa(true);
  // };

  // const onCloseModal = () => {
  //   setShowModa(false);
  // };

  return (
    <>
      {/* <Button
        type="button"
        onClick={onOpenModal}
        style={{ marginTop: '05px' }}
        variant="contained"
        color="error"
        size="small"
      >
        logaut
      </Button>
      <img src={plusbtn} className="s.calendar" alt="calendar" /> */}
      {/* <ButtonAddTransactions onOpenModal={onOpenModal} /> */}

      {/* {showModal && <ModalLogout onCloseModal={onCloseModal} />} */}

      {/* {showModal && <ModalAddTransaction onCloseModal={onCloseModal} />} */}
      <MobileModalAddTransaction />
    </>
  );
}

export default TestModalComponent;
