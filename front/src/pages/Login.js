import React, { useContext, useState } from "react";
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

  const [error, setError] = useState(null);
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);
  
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

      const {email, password } = values;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

       fetch('/api/auth/login', options)
      .then(response => response.json())
      .then(res => {  
          if(res.ok){
            history.push("/dashboard");
          }
        }).catch((err) => {
          console.log("entro al coso")
          console.log(err.message)
          setError(err.message);
        });
      },
  });

  return (

    <>
    <div className="min-h-full flex bg-black">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-200">Inicia sesión con tu cuenta</h2>
          </div>

          <div className="mt-8">

            <div className="mt-6">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Correo electrónico
                  </label>
                  
                  {formik.touched.email && formik.errors.email ? (
                    <div className="errors">{formik.errors.email}</div>
                   ) : null}

                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Contraseña
                  </label>

                  {formik.touched.password && formik.errors.password ? (
                  <div className="errors">{formik.errors.password}</div>
                  ) : null}

                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                </div>
                <div>
                {error ? (
                  <div className="errors">{error}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1633358050629-bb6a292616ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
          alt=""
        />
      </div>
    </div>
  </>
  );
}

export default SignupForm;