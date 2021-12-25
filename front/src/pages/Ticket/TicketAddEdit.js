import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import TicketService from "../../api/services/user.service";
import EventService from "../../api/services/event.service";
import BatchesService from "../../api/services/batches.service";
import moment from "moment";

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

  if(!values.phone) {
    errors.surname = "Requerido.";
  } if (values.phone.length > 10){
    errors.phone = "El número del teléfono no puede ser mayor a 10 cáracteres";
  } else if (!/^\d+$/.test(values.phone)) {
    errors.phone = "Teléfono inválido.";
  }

  if (!values.event) {
    errors.event = "Requerido.";
  }

  if (!values.batches) {
    errors.batches = "Requerido.";
  }

  if(values.quantity <= 0){
    errors.quantity = "El campo no puede ser menor o igual a 0 (CERO).";
  }
  return errors;
};

function TicketAddEdit({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [ticket, setTicket] = useState(null);
  const [ticketError, setTicketError] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [activeBatches, setActiveBatches] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      phone: "",
      dni: "",
      event: "",
      batches: "",
      quantity: 1,
    },
    validate,

    onSubmit: ({ email, name, surname, phone, dni, event, batches, quantity, setFieldValue }) => {
      const data = {
        email,
        name,
        surname,
        phone,
        dni, 
        event,
        batches
      };

      if (isAddMode) {
        createTicket(data);
      } else {
        updateTicket(id, data);
      }
    },
  });

  function createTicket(data) {
    TicketService.create(data)
      .then(() => {
        console.log("El ticket fue creado.");
        history.push("/entradas");
      })
      .catch((error) => {
        if (error.response) {
          setTicketError(error.response.data.message.message);
        }
      });
  }

  function updateTicket(ticketId, data) {
    TicketService.edit(ticketId, data)
      .then(() => {
        console.log("El ticket fue editado.");
        history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          setTicketError(error.response.data.message.message);
        }
      });
  }

  function getAllBatchesByEvent(eventId) {
    BatchesService.getByEvent(eventId)
    .then((res) => {
      if (res.data.ok) {
        setAllBatches(res.data.data);
        setTicketError(null);
      }
      })
      .catch((error) => {
        if (error.response){
          setTicketError(error.response.data.message.message);
          setAllBatches([]);
          setActiveBatches({});
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
      TicketService.getById(id).then((res) => {
        if (res.data.ok) {
          const fields = ["email", "name", "surname", "phone", "dni", "event", "batches"];
          fields.forEach((field) => {
            formik.setFieldValue(field, res.data.data[field], false);

            if (field === "event") {
              formik.setFieldValue(field, res.data.data.event._id, false);
            }

            if (field === "batches") {
              formik.setFieldValue(field, res.data.data.batches._id, false);
            }
          });

          setTicket(res.data.data);
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
                {isAddMode ? "Crear entrada" : "Editar entrada"}
                {ticketError ? (
                  <span className="mx-2 text-red-600">×{ticketError}</span>
                ) : null}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Las entradas una vez creadas no pueden ser editadas, solamente por un administrador. Teniendo esto en cuenta, cercionarse de introducir bien todos los datos, sobretodo el email, ya que al crearse la entrada se le enviará un email con un código QR.</p>
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
                  {formik.touched.surname && formik.errors.surname ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.surname}
                    </span>
                  ) : null}
                </label>
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
                  {formik.touched.email && formik.errors.email ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.email}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Número de telefono
                  {formik.touched.phone && formik.errors.phone ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.phone}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
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
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => {
                      formik.setFieldValue("event", e.target.value);
                      getAllBatchesByEvent(e.target.value);
                    }}
                    required
                    onBlur={formik.handleBlur}
                    value={formik.values.event}
                  >
                    <option value="">Elegí un evento</option>
                    {allEvents &&
                      allEvents.map((event, index) => {
                        return (
                          <option key={event._id} value={event._id}>
                            {event.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="batches"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Tanda
                  {formik.touched.batches && formik.errors.batches ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.batches}
                    </span>
                  ) : null}
                </label>

                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="batches"
                    name="batches"
                    required
                    className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => {
                      formik.setFieldValue("batches", e.target.value);
                      const filterBatches = allBatches.filter((batch) => batch._id === e.target.value);
                      setActiveBatches(filterBatches[0]);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.batches}
                  >
                    <option value="">Elegí una tanda</option>
                    {allBatches &&
                      allBatches.map((batch, index) => {
                        return (
                          <option key={batch._id} value={batch._id}>
                            {batch.name} - Desde {moment.utc(batch.dateFrom).format("DD/MM/YYYY")} hasta {moment.utc(batch.dateTo).format("DD/MM/YYYY")} - ${batch.price}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Cantidad de entradas a vender ({activeBatches && activeBatches.quantity ? "Stock: " + activeBatches.quantity : "Stock ilimitado"})
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <span className="mx-2 text-red-600">
                      ×{formik.errors.quantity}
                    </span>
                  ) : null}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    min={1}
                    max={activeBatches && activeBatches.quantity ? activeBatches.quantity : 9999}
                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.quantity}
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

export { TicketAddEdit };
