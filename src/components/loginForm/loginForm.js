import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useIsMount } from '../../hooks/useIsMount';
import Loader from '../Loader/Loader';
import { usersOperations, usersSelectors } from '../../redux/users';
import { MdEmail, MdLock } from 'react-icons/md';

import s from './loginForm.module.css';

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMount = useIsMount();

  const isLoading = useSelector(usersSelectors.getIsFetchingCurrent);
  const isError = useSelector(usersSelectors.getError);

  useEffect(() => {
    if (isMount) {
      return;
    } else {
      if (isError) {
        toast.error('Неверный логин или пароль!', {
          toastId: 'custom-id-yes',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const handleOnClickToRegister = () => {
    navigate('/register');
  };

  const validationSchema = yup.object().shape({
    email: yup.string().matches(emailRegexp, 'Введите корректный email').required('Введите email'),
    password: yup.string().min(6).max(12).required('Введите пароль'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;
      dispatch(usersOperations.logIn({ email, password }));
      resetForm();
    },
  });

  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur } = formik;

  const buttonStatus = !isValid || Object.keys(touched).length === 0;

  return (
    <>
      {isLoading && <Loader />}

      <form className={'registerForm'} onSubmit={handleSubmit}>
        <label htmlFor={'email'} className={s.field}>
          <MdEmail className={s.icon} />
          <input
            id={'email'}
            type={'email'}
            name={'email'}
            placeholder={'E-mail'}
            className={s.input}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </label>
        {touched.email && errors.email && <p className={s.notification}>{errors.email}</p>}

        <label htmlFor={'password'} className={s.field}>
          <MdLock className={s.icon} />
          <input
            id={'password'}
            type={'password'}
            name={'password'}
            placeholder={'Пароль'}
            className={s.input}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </label>
        {touched.password && errors.password && <p className={s.notification}>{errors.password}</p>}

        <button
          disabled={buttonStatus}
          type={'submit'}
          className={buttonStatus ? s.btn : [s.logInBtn, s.btn].join(' ')}
        >
          Вход
        </button>

        <button
          onClick={handleOnClickToRegister}
          type="button"
          className={s.registerBtn + ' ' + s.btn}
        >
          Регистрация
        </button>
      </form>

      {isError && <ToastContainer autoClose={3000} position="top-center" theme="colored" />}
    </>
  );
}
