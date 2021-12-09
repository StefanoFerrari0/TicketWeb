import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import AndLogo from "../images/Logo.png";
import AuthService from "../api/services/auth.service";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Requerido.";
  } else if (values.password.length < 4) {
    errors.password = "La contraseña debe tener al menos 4 caracteres.";
  }

  if (!values.email) {
    errors.email = "Requerido.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido.";
  }

  return errors;
};

function SignupForm(props) {
  const [loginError, setLoginError] = useState(null);
  let history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,

    onSubmit: ({ email, password }) => {

      const data = {
        email, 
        password
      }
         AuthService.login(data).then((res) => {
          if(res.data.ok){
            res.data.data.roles.map((role) => {
              delete role.__v
              delete role._id;
              delete role.isDelete;
              return;
            })
            setUser(res.data.data); 
            history.push("/");
          }
        }).catch(error => {
          if(error.response){
            setLoginError(error.response.data.message);
          }
          console.log(error);
        });
    }
  });


  useEffect(() => {
    if(user){
      history.push("/");
    }
  }, [user])

  return (
    <>
        <div className="min-h-full flex bg-black">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                  className="h-12 w-auto"
                  src={AndLogo}
                  alt="AndProducciones"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-200">
                  Inicia sesión con tu cuenta
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white"
                      >
                        Correo electrónico
                      </label>

                      {formik.touched.email && formik.errors.email ? (
                        <p className="mt-2 mb-4 text-sm text-red-600">
                          {formik.errors.email}
                        </p>
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
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-white"
                      >
                        Contraseña
                      </label>

                      {formik.touched.password && formik.errors.password ? (
                        <p className="mt-2 mb-4 text-sm text-red-600">
                          {formik.errors.password}
                        </p>
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
                      {loginError ? (
                        <p className="mt-2 mb-4 text-sm text-red-600">
                          {loginError.message}
                        </p>
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
