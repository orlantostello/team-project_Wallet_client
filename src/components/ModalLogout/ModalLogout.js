import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { usersOperations } from '../../redux/users';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import s from './ModalLogout.module.css';

const modalRoot = document.querySelector('#modal-root');

function ModalLogout({ onCloseModal }) {
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#24cca7',
        contrastText: '#000',
      },
      neutral: {
        main: '#ff6596',
        contrastText: '#000',
      },
    },
  });

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
          <ThemeProvider theme={theme}>
            <Button
              type="button"
              onClick={() => inLogout()}
              style={{
                marginTop: '05px',
                marginLeft: 'auto',
                marginRight: '80px',
                borderRadius: '05px',
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Да
            </Button>
            <Button
              type="button"
              onClick={() => onCloseModal()}
              style={{ marginTop: '05px', marginRight: 'auto', borderRadius: '05px' }}
              variant="contained"
              color="neutral"
              size="small"
            >
              Нет
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

export default ModalLogout;
