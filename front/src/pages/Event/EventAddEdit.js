import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import EventService from "../../api/services/event.service";
import moment from 'moment';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerido.";
  }

  if (!values.date) {
    errors.surname = "Requerido.";
  }

  return errors;
};

function EventAddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [event, setEvent] = useState(null);
  const [eventError, setEventError] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
    },
    validate,

    onSubmit: ({name, date, setFieldValue }) => {
      const data = {
        name,
        date,
      };

      if (isAddMode) {
        createEvent(data);
      } else {
        updateEvent(id, data);
      }
    },
  });

  function createEvent(data) {
    EventService.create(data)
      .then(() => {
        console.log("El evento fue creado.");
        history.push("/eventos");
      })
      .catch((error) => {
        if (error.response) {
          setEventError(error.response.data.message.message);
        }
      });
  }

  function updateEvent(eventId, data) {
    EventService.edit(eventId, data)
      .then(() => {
        console.log("El evento fue editado.");
        history.push("/eventos");
      })
      .catch((error) => {
        if (error.response) {
          setEventError(error.response.data.message.message);
        }
      });
  }

  useEffect(() => {
    if (!isAddMode) {
      EventService.getById(id).then((res) => {
        if (res.data.ok) {
          const fields = ["name", "date"];
          res.data.data.date = moment.utc(res.data.data.date).format("YYYY-MM-DD");
          fields.forEach((field) => {
            formik.setFieldValue(field, res.data.data[field], false);
          });

          setEvent(res.data.data);
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
                {isAddMode ? "Crear evento" : "Editar evento"}
                {eventError ? (
                  <span className="mx-2 text-red-600">×{eventError}</span>
                ) : null}
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
                  {formik.touched.name && formik.errors.name ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.name}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
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
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Fecha
                  {formik.touched.date && formik.errors.date ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.date}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                  />
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

export { EventAddEdit };
