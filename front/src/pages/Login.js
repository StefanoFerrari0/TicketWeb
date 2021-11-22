import React, { useContext } from "react";
import "../styles/Login.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Requerido";
  } else if (values.password.length < 4) {
    errors.password = "La contraseña debe tener al menos 4 caracteres.";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido.";
  }

  return errors;
};

function SignupForm(){

  let history = useHistory();
  const { user } = useContext(UserContext);
  
    if(user) {
      history.push("/dashboard")
   }


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,

    onSubmit: (values) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      };

      fetch("/api/auth/login", requestOptions).then(
        (res) =>  {
            if(res.ok){
              history.push("/dashboard")
            }
        },
        (error) => {
          console.log("error: ", error);
        }
      );
    },
  });

  return (
    <section className="mainContainer">
      <div className="card">
        <div>
          <h2 className="title">Login</h2>
        </div>

        <form className="form" onSubmit={formik.handleSubmit}>
          <label className="labels" htmlFor="email">
            Email
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div className="errors">{formik.errors.email}</div>
          ) : null}
          <input
            className="inputs"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <label className="labels" htmlFor="password">
            Contraseña
          </label>

          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}

          <input
            className="inputs"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

          <button className="btn" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignupForm;