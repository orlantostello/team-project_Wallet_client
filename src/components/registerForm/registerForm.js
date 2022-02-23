import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ProgressBar from '@ramonak/react-progress-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useIsMount } from '../../hooks/useIsMount';
import Loader from '../Loader/Loader';
import { usersOperations, usersSelectors } from '../../redux/users';
import { MdEmail, MdLock, MdAccountBox } from 'react-icons/md';

import s from './registerForm.module.css';

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

export default function RegisterForm() {
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
        toast.error('Упс! Такой логин уже используется', {
          toastId: 'custom-id-yes',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const handleOnClickToLogin = () => navigate('/login');

  const validationSchema = yup.object().shape({
    email: yup.string().matches(emailRegexp, 'Введите корректный email').required('Введите email'),
    password: yup
      .string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .max(12, 'Пароль должен содержать не более 12 символов')
      .required('Введите пароль'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Повторно введите пароль'),
    name: yup
      .string()
      .min(2, 'Имя должно содержать не менее 2 символов')
      .required('Введите Ваше имя'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { name, email, password } = values;
      dispatch(usersOperations.register({ name, email, password }));
      // await createNotification();
      resetForm();
    },
  });

  const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur } = formik;

  const countPasswordLength = value => value.length;
  const countConfirmPasswordLength = value => value.length;

  const buttonStatus = !isValid || Object.keys(touched).length === 0;

  return (
    <>
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

        <label htmlFor={'confirmPassword'} className={s.field}>
          <MdLock className={s.icon} />
          <input
            id={'confirmPassword'}
            type={'password'}
            name={'confirmPassword'}
            placeholder={'Подтвердите пароль'}
            className={s.input}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </label>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className={s.notification}>{errors.confirmPassword}</p>
        )}

        {values.confirmPassword && (
          <ProgressBar
            className={s.progressBar}
            completed={countPasswordLength(values.confirmPassword)}
            bgColor="#24cca7"
            height="2px"
            borderRadius="10%"
            isLabelVisible={false}
            baseBgColor="#e5f1ef"
            labelColor="#11ff40"
            maxCompleted={countConfirmPasswordLength(values.password)}
          />
        )}

        <label htmlFor={'name'} className={s.field}>
          <MdAccountBox className={s.icon} />
          <input
            id={'name'}
            type={'text'}
            name={'name'}
            placeholder={'Ваше имя'}
            className={s.input}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
        </label>
        {touched.name && errors.name && <p className={s.notification}>{errors.name}</p>}

        <button
          disabled={buttonStatus}
          type={'submit'}
          className={buttonStatus ? s.btn : [s.registerBtn, s.btn].join(' ')}
        >
          Регистрация
        </button>

        <button
          onClick={handleOnClickToLogin}
          type="button"
          className={[s.logInBtn, s.btn].join(' ')}
        >
          Вход
        </button>
      </form>

      {isLoading && <Loader />}

      {isError && <ToastContainer autoClose={3000} position="top-center" theme="colored" />}
    </>
  );
}
