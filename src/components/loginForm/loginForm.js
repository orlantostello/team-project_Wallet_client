// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdEmail, MdLock } from "react-icons/md";
import s from "./loginForm.module.css";

const emailRegexp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

export default function LoginForm() {
  // const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(emailRegexp, "Введите корректный email")
      // .email("Введите email")
      .required("Введите email"),
    password: yup.string().min(6).max(12).required("Введите пароль"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(JSON.stringify(values, null, 2));
      // dispatch(login({ email, password }));
      resetForm();
    },
  });

  const {
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;

  console.log("isValid && !dirty: ", isValid && !dirty);
  // console.log("formik: ", formik);

  return (
    <form className={"registerForm"} onSubmit={handleSubmit}>
      <label htmlFor={"email"} className={s.field}>
        <MdEmail className={s.icon} />
        <input
          id={"email"}
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          className={s.input}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </label>
      {touched.email && errors.email && (
        <p className={s.notification}>{errors.email}</p>
      )}

      <label htmlFor={"password"} className={s.field}>
        <MdLock className={s.icon} />
        <input
          id={"password"}
          type={"password"}
          name={"password"}
          placeholder={"Пароль"}
          className={s.input}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </label>
      {touched.password && errors.password && (
        <p className={s.notification}>{errors.password}</p>
      )}

      <button
        disable={isValid && !dirty}
        type={"submit"}
        className={[s.logInBtn, s.btn].join(" ")}
      >
        Вход
      </button>

      <button type="button" className={s.registerBtn + " " + s.btn}>
        Регистрация
      </button>
    </form>
  );
}
