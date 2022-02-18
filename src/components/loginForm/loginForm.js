import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MdEmail, MdLock } from 'react-icons/md';

import { usersOperations, usersSelectors } from '../../redux/users';
import s from './loginForm.module.css';

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

export default function LoginForm() {
  const dispatch = useDispatch();

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

  const { values, errors, touched, isValid, dirty, handleSubmit, handleChange, handleBlur } =
    formik;

  // console.log('isValid && !dirty: ', isValid && !dirty);

  const navigate = useNavigate();
  const handleOnClickToRegister = () => {
    navigate('/register');
  };

  return (
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

      <button disable={isValid && !dirty} type={'submit'} className={[s.logInBtn, s.btn].join(' ')}>
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
  );
}
