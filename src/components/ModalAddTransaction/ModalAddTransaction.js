import { useState } from 'react';
import { Input } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-hot-toast';

import Modal from '../Modal';
import Switch from '../Switch';
import categoriesSelectors from '../../redux/categories/categories-selectors';
import { transactionsOperations } from '../../redux/transactions';
import { usersOperations } from '../../redux/users';
import calendar from './calendar.svg';
import close from './close.svg';
import s from './ModalAddTransaction.module.css';

function ModalAddTransaction({ onCloseModal }) {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  const categories = useSelector(categoriesSelectors.getAllCategories);
  const arrayKeys = Object.keys(categories.costs);

  const handleChangeChecked = event => {
    setChecked(event.target.checked);
  };

  const validationSchema = yup.object().shape({
    category: yup.string().required('Required'),
    amount: yup.number('Enter your amount').required('Amount is required'),
    comment: yup.string(),
    isIncome: yup.bool().required('Required'),
  });

  const date = new Date();

  const formik = useFormik({
    initialValues: {
      category: '',
      amount: '',
      comment: '',
      isIncome: true,
      date: date.getTime(),
    },

    validationSchema: validationSchema,
    onSubmit: async values => {
      const currentValue = {
        ...values,
        isIncome: checked,
        date: date.getTime(),
      };
      await dispatch(transactionsOperations.createTransactions(currentValue));
      await dispatch(usersOperations.fetchCurrentUser());
      onCloseModal();
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#24CCA7',
        contrastText: '#fff',
      },
      neutral: {
        main: '#fff',
        contrastText: '#4A56E2',
      },
    },
  });

  return (
    <Modal onCloseModal={onCloseModal}>
      <div>
        <p className={s.text}>Добавить транзакцию</p>
        <form className={s.form} onSubmit={handleSubmit}>
          <Box className={s.togolbar}>
            {checked ? (
              <span className={s.plus}>Доход</span>
            ) : (
              <span className={s.plus_noactive}>Доход</span>
            )}
            <label htmlFor={'isIncome'}>
              <Switch
                id={'isIncome'}
                name={'isIncome'}
                value={values.isIncome}
                onSwitch={handleChangeChecked}
                isChecked={checked}
                onClick={handleChangeChecked}
              />
            </label>
            {checked ? (
              <span className={s.minus_noactive}>Расход</span>
            ) : (
              <span className={s.minus}>Расход</span>
            )}
          </Box>

          <div className={s.categories}>
            <FormControl variant="standard" sx={{ m: 1, width: 409, height: 34 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{
                  paddingLeft: '20px',
                  fontFamily: 'Circe',
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#8b8686',
                }}
              >
                Выберите категорию
              </InputLabel>
              <label htmlFor={'category'} />
              <Select
                labelId="demo-simple-select-standard-label"
                id={'category'}
                name={'category'}
                value={values.category}
                onChange={handleChange}
                label="Category"
              >
                {categories && checked
                  ? arrayKeys.map(el => (
                      <MenuItem key={el} dataid={el} value={el}>
                        {categories.income[el]}
                      </MenuItem>
                    ))
                  : arrayKeys.map(el => (
                      <MenuItem key={el} value={el}>
                        {categories.costs[el]}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            {touched.category && errors.category && (
              <p className={s.notification}>Выберите категорию</p>
            )}
          </div>

          <div className={s.balancedate}>
            <label htmlFor={'amount'} />
            <Input
              type={'number'}
              id={'amount'}
              name={'amount'}
              value={values.amount}
              placeholder="0.00"
              style={{
                width: '190px',
                paddingLeft: '80px',
                paddingRight: 'auto',
                marginRight: '30px',
              }}
              onChange={handleChange}
              required
            />

            <div className={s.datecalendar}>
              <p className={s.date}>
                {new Date().toLocaleString('ru', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <img src={calendar} className="s.calendar" alt="calendar" />
            </div>
            {touched.amount && errors.amount && (
              <p className={s.notification_amount}>Введите коректное значение</p>
            )}
          </div>

          <div className={s.comment}>
            <label htmlFor={'comment'} />
            <Input
              id={'comment'}
              name={'comment'}
              value={values.comment}
              placeholder="Комментарий"
              type="text"
              style={{
                width: '410px',
                height: '30px',
                marginTop: '43px',
                paddingLeft: '20px',
              }}
              onChange={handleChange}
            />
          </div>

          <div className={s.buttongroup}>
            <ThemeProvider theme={theme}>
              <Button
                type={'submit'}
                style={{
                  marginTop: '50px',
                  width: '300px',
                  height: '50px',
                  borderRadius: '20px',
                  fontFamily: 'Circe',
                  fontSize: '18px',
                  fontWeight: '400',
                }}
                variant="contained"
                color="primary"
                size="small"
              >
                ДОБАВИТЬ
              </Button>
              <Button
                type="button"
                onClick={onCloseModal}
                style={{
                  marginTop: '20px',
                  width: '300px',
                  height: '50px',
                  borderRadius: '20px',
                  boxShadow: '0 0 1px 1px #4A56E2',
                  fontFamily: 'Circe',
                  fontSize: '18px',
                  fontWeight: '400',
                }}
                variant="contained"
                color="neutral"
                size="small"
              >
                ОТМЕНА
              </Button>
            </ThemeProvider>
          </div>
        </form>
        <button className={s.closebtn} type="button" onClick={onCloseModal}>
          <img src={close} className={s.close} alt="closebtn" />
        </button>
      </div>
    </Modal>
  );
}

export default ModalAddTransaction;
