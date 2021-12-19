import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import BatchesService from "../../api/services/batches.service";
import EventService from "../../api/services/event.service";
import moment from "moment";
import { disabled } from "express/lib/application";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerido.";
  }

  if (!values.dateFrom) {
    errors.dateFrom = "Requerido.";
  } else if (values.dateFrom > values.dateTo){
    errors.dateFrom = "La fecha de inicio no puede ser mayor que la fecha de finalización del evento";
  }

  if (!values.event) {
    errors.event = "Requerido.";
  }

  if (!values.dateTo) {
    errors.dateTo = "Requerido.";
  }else if (values.dateTo < values.dateFrom){
    errors.dateTo = "La fecha de finalización no puede ser menor que la fecha de inicio del evento";
  }

  if(values.quantity <= 0){
    errors.quantity = "La cantidad no puede ser menor o igual a 0(CERO).";
  }

  if (!values.price) {
    errors.dateTo = "Requerido.";
  } else if(values.price < 0){
    errors.quantity = "El precio no puede ser menor a 0(CERO).";
  }

  return errors;
};

function BatchesAddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [batch, setBatch] = useState(null);
  const [batchError, setBatchError] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const formik = useFormik({
    initialValues: {
        name: "",
        dateFrom: "",
        dateTo: "",
        event: "",
        quantity: 0,
        price: 0,

    },
    validate,

    onSubmit: ({ name, dateFrom, dateTo, event, quantity, price, setFieldValue }) => {
      const data = {
        name,
        dateFrom,
        dateTo,
        event,
        quantity,
        price
      };

      if (isAddMode) {
        createBatches(data);
      } else {
        updateBatches(id, data);
      }
    },
  });

  function createBatches(data) {
    BatchesService.create(data)
      .then(() => {
        console.log("La tanda fue creada.");
        history.push("/tandas");
      })
      .catch((error) => {
        if (error.response) {
          setBatchError(error.response.data.message.message);
        }
      });
  }

  function updateBatches(batchesId, data) {
    BatchesService.edit(batchesId, data)
      .then(() => {
        console.log("La tanda fue editada.");
        history.push("/tandas");
      })
      .catch((error) => {
        if (error.response) {
          setBatchError(error.response.data.message.message);
        }
      });
  }

  useEffect(() => {
    EventService.getAll().then((res) => {
      if (res.data.ok) {
        setAllEvents(res.data.data);
      }
    });

    if (!isAddMode) {
      BatchesService.getById(id).then((res) => {
        if (res.data.ok) {
          const fields = ["name", "dateTo", "dateFrom", "event", "price", "quantity"];
          const { _id } = res.data.data.event;
          console.log(res.data.data.event);
          res.data.data.dateFrom = moment.utc(res.data.data.dateFrom).format("YYYY-MM-DD");
          res.data.data.dateTo = moment.utc(res.data.data.dateTo).format("YYYY-MM-DD");

          fields.forEach((field) => {
            formik.setFieldValue(field, res.data.data[field], false);

            if (field === "event") {
              formik.setFieldValue(field, _id, false);
            }
          });

          setBatch(res.data.data);
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
                {isAddMode ? "Crear tanda" : "Editar tanda"}
                {batchError ? (
                  <span className="mx-2 text-red-600">×{batchError}</span>
                ) : null}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">El campo stock es opcional. Tenga en cuenta que una vez creada la tanda, los campos Precio y Evento no podrán ser editados, estos mantendran sus valores para siempre.</p>
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
                  htmlFor="dateFrom"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Fecha desde
                  {formik.touched.dateFrom && formik.errors.dateFrom ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.dateFrom}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    type="date"
                    name="dateFrom"
                    id="dateFrom"
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateFrom}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="dateTo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Fecha hasta
                  {formik.touched.dateTo && formik.errors.dateTo ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.dateTo}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                    type="date"
                    name="dateTo"
                    id="dateTo"
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateTo}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="event"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Evento
                  {formik.touched.event && formik.errors.event ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.event}
                    </span>
                  ) : null}
                </label>

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="event"
                    name="event" 
                    required
                    className={`${!isAddMode ? "bg-gray-400" : ""} max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md`}
                    onChange={formik.handleChange}
                    disabled={!isAddMode ? true : false}
                    onBlur={formik.handleBlur}
                    value={formik.values.event}
                  >
                    <option value="">Elegí un evento</option>
                    {allEvents &&
                      allEvents.map((event, index) => {
                          
                        return (
                          <option key={event._id} value={event._id}>
                            {event.name + " - " + moment.utc(event.date).format("DD/MM/YYYY")}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Precio
                  {formik.touched.price && formik.errors.price ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.price}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    className={`${!isAddMode ? "bg-gray-400" : ""} max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md`}
                    disabled={!isAddMode ? true : false}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Stock
                  {formik.touched.stock && formik.errors.stock ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.stock}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stock}
                  />
                </div>
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

export { BatchesAddEdit };
