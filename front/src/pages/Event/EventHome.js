import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import EventService from "../../api/services/event.service";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function EventHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      await EventService.getAll()
        .then((res) => {
          if (res.data.ok) {
            setData(res.data.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsError(true);
        });
    };
    fetchData();
  }, []);

  const deleteEvent = async (userId) => {
    await EventService.delete(userId)
      .then((res) => {
        if (res.data.ok) {
          var removeItem = data.filter(function (item) {
            return item._id !== userId;
          });
          setData(removeItem);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <>
    <div className="max-w-8xl h-screen bg-gray-900 mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex justify-end py-10">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Link to={`/eventos/crear/`} className="">
              Crear evento
            </Link>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Evento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((event) => (
                      <tr key={event.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {event.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment.utc(event.date).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-evenly">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <Link
                              to={`/eventos/editar/${event._id}`}
                              className=""
                            >
                              Editar
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setActiveEvent(event);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        title="Eliminar usuario"
        description={`Está seguro que desea eliminar el evento ${
          activeEvent.name
        }? Si ya existen tickets vendidos para este evento, por favor, no lo elimine.`}
        btnAccept="Eliminar evento"
        btnCancel="Cancelar"
        onClickAccept={() => deleteEvent(activeEvent._id)}
      />
    </>
  );
}
