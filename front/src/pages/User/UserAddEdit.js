import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import UserService from "../../api/services/user.service";
import RoleService from "../../api/services/role.service";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerido.";
  }

  if (!values.surname) {
    errors.surname = "Requerido.";
  } else if (values.surname.length < 3) {
    errors.surname = "El apellido debe tener al menos 3 caracteres.";
  }

  if (!values.email) {
    errors.email = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email inválido.";
  }

  return errors;
};

function UserAddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [allRoles, setAllRoles] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      roles: [],
    },
    validate,

    onSubmit: ({ email, name, surname, roles, setFieldValue }) => {
      const data = {
        email,
        name,
        surname,
        roles,
      };

      if (isAddMode) {
        createUser(data);
      } else {
        updateUser(id, data);
      }
    },
  });

  function createUser(data) {
    UserService.create(data)
      .then(() => {
        console.log("El usuario fue creado.");
        history.push("/usuarios");
      })
      .catch((error) => {
        setUserError(error);
        console.log(userError);
      });
  }

  function updateUser(userId, data) {
    UserService.edit(userId, data)
      .then(() => {
        console.log("El usuario fue editado.");
        history.push("/usuarios");
      })
      .catch((error) => {
        setUserError(error);
        console.log(userError);
      });
  }

  useEffect(() => {
    RoleService.getAll().then((res) => {
      if (res.data.ok) {
        setAllRoles(res.data.data);
      }
    });

    if (!isAddMode) {
      UserService.getById(id).then((res) => {
        if (res.data.ok) {
          const fields = ["email", "name", "surname", "roles"];
          const { _id } = res.data.data.roles[0];
          console.log(_id);
          fields.forEach((field) => {
            formik.setFieldValue(field, res.data.data[field], false);

            if (field === "roles") {
              console.log("entró ", field);
              formik.setFieldValue(field, _id, false);
            }
          });

          setUser(res.data.data);
        }
      });
    }
  }, []);

  return (
    <div className="max-w-8xl h-screen bg-gray-100 mx-auto px-4 sm:px-6 md:px-8 py-6">
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                {isAddMode ? "Crear usuario" : "Editar usuario"}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Nombre
                </label>

                {/*   {formik.touched.name && formik.errors.name ? (
                    <p className="text-sm text-red-600 block font-medium sm:col-span-6">
                      {formik.errors.name}
                    </p>
                  ) : null} */}

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Apellido
                </label>

                {/*   {formik.touched.surname && formik.errors.surname ? (
                  <p className="mt-2 mb-4 text-sm text-red-600">
                    {formik.errors.surname}
                  </p>
                ) : null} */}

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    autoComplete="family-name"
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email
                </label>

                {/*   {formik.touched.email && formik.errors.email ? (
                  <p className="mt-2 mb-4 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                ) : null} */}

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="rol"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Rol
                </label>

                {/*    {formik.touched.roles && formik.errors.roles ? (
                  <p className="mt-2 mb-4 text-sm text-red-600">
                    {formik.errors.roles}
                  </p>
                ) : null} */}

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="roles"
                    name="roles"
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roles}
                  >
                    <option value="">Elegí un rol</option>
                    {allRoles &&
                      allRoles.map((rol, index) => {
                        return (
                          <option key={rol._id} value={rol._id}>
                            {rol.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-center space-x-20">
            <button
              type="button"
              className="bg-white py-2 px-20  border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isAddMode ? "Agregar" : "Editar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { UserAddEdit };
