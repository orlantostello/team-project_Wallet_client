import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ProgressBar from '@ramonak/react-progress-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../Loader/Loader';
import { usersOperations, usersSelectors } from '../../redux/users';
import { MdEmail, MdLock, MdAccountBox } from 'react-icons/md';

import s from './registerForm.module.css';

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(usersSelectors.getIsFetchingCurrent);
  const isError = useSelector(usersSelectors.getError);

  async function createNotification() {
    await toast.error('Упс! Произошла ошибка. Такой логин уже используется', {
      toastId: 'custom-id-yes',
    });
  }

  const handleOnClickToLogin = () => navigate('/login');

  const validationSchema = yup.object().shape({
    email: yup.string().matches(emailRegexp, 'Введите корректный email').required('Введите email'),
    password: yup.string().min(6).max(12).required('Введите пароль'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Повторно введите пароль'),
    name: yup.string().min(1).max(12).required('Введите Ваше имя'),
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
      await dispatch(usersOperations.register({ name, email, password }));
      await createNotification();
      resetForm();
    },
  });

  const { values, errors, touched, isValid, dirty, handleSubmit, handleChange, handleBlur } =
    formik;

  const countPasswordLength = value => value.length.toString();
  const countConfirmPasswordLength = value => value.length.toString();

  // console.log('isValid && !dirty: ', isValid && !dirty);

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
            baseBgColor="#f40d0d"
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
          // disable={(isValid && !dirty).toString()}
          type="submit"
          className={s.registerBtn + ' ' + s.btn}
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
