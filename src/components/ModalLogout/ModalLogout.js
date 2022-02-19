import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { usersOperations } from '../../redux/users';
import { Button } from '@mui/material';
import s from './ModalLogout.module.css';

const modalRoot = document.querySelector('#modal-root');

function ModalLogout({ onCloseModal }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  function inLogout() {
    dispatch(usersOperations.logOut());
    onCloseModal();
  }

  return createPortal(
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.content}>
        <p className={s.text}>Вы точно хотите выйти?</p>
        <div className={s.buttongroup}>
          <Button
            type="button"
            onClick={() => inLogout()}
            style={{
              marginTop: '05px',
              marginLeft: 'auto',
              marginRight: '50px',
              borderRadius: '05px',
            }}
            variant="contained"
            color="success"
            size="small"
          >
            Да
          </Button>
          <Button
            type="button"
            onClick={() => onCloseModal()}
            style={{ marginTop: '05px', marginRight: 'auto', borderRadius: '05px' }}
            variant="contained"
            color="error"
            size="small"
          >
            Нет
          </Button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default ModalLogout;
