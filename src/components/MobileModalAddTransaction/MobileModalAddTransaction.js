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
// import { toast } from 'react-hot-toast';

import s from './MobileModalAddTransaction.module.css';
import Switch from '../Switch';
import calendar from '../ModalAddTransaction/calendar.svg';

function MobileModalAddTransaction() {
  const [checked, setChecked] = useState(true);

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
    onSubmit: values => {
      const correctValue = {
        ...values,

        isIncome: checked,

        date: date.getTime(),
      };
      console.log(JSON.stringify(correctValue, null, 2));
      onFormSubmit(correctValue);
    },
  });

  function onFormSubmit() {
    // onCloseModal();
  }

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    // handleBlur,
  } = formik;

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

  const categories = {
    costs: {
      1: 'clothes',
      2: 'food',
      3: 'transport',
      4: 'sport',
      5: 'children',
      6: 'pets',
      7: 'house',
      8: 'education',
      9: 'entertainment',
      10: 'health',
      11: 'other',
    },
    income: { 1: 'regular', 2: 'irregular' },
  };

  const categoriesRU = {
    costs: {
      1: 'одежда',
      2: 'еда',
      3: 'транспорт',
      4: 'спорт',
      5: 'дети',
      6: 'домашние животные',
      7: 'дом',
      8: 'образование',
      9: 'развлечения',
      10: 'здоровье',
      11: 'другие',
    },
    income: {
      1: 'регулярные доходы',
      2: 'нерегулярные доходы',
    },
  };

  const arrayKeys = Object.keys(categories.costs);

  return (
    <>
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
                style={{
                  width: '100%',
                }}
              >
                {categories && checked
                  ? arrayKeys.map(el => (
                      <MenuItem key={el} dataid={el} value={el}>
                        {categoriesRU.income[el]}
                      </MenuItem>
                    ))
                  : arrayKeys.map(el => (
                      <MenuItem key={el} value={el}>
                        {categoriesRU.costs[el]}
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
                minWidth: '280px',
                height: '34px',
                paddingLeft: '20px',
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
                width: '280px',
                height: '74px',
                marginTop: '40px',
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
                  marginTop: '40px',
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
                // onClick={onCloseModal}
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
      </div>
    </>
  );
}

export default MobileModalAddTransaction;
