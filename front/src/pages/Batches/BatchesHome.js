import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import BatchesService from "../../api/services/batches.service";
import { Link } from "react-router-dom";
import moment from "moment";

export default function BatchesHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeBatches, setActiveBaches] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      await BatchesService.getAll()
        .then((res) => {
          if (res.data.ok) {
            setData(res.data.data);
            console.log(res.data.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsError(true);
        });
    };
    fetchData();
  }, []);

  const deleteUser = async (batchesId) => {
    await BatchesService.delete(batchesId)
      .then((res) => {
        if (res.data.ok) {
          var removeItem = data.filter(function (item) {
            return item._id !== batchesId;
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
            <Link to={`/tandas/crear/`} className="">
              Crear Tanda
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
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha desde
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fecha hasta
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Precio
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
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
                    {data.map((batch) => (
                      <tr key={batch.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {batch.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Evento: {}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment.utc(batch.dateFrom).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment.utc(batch.dateTo).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${batch.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {batch.quantity ? batch.quantity : "NO"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-evenly">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            <Link
                              to={`/tandas/editar/${batch._id}`}
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
                              setActiveBaches(batch);
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
        title="Eliminar tanda"
        description={`Está seguro que desea eliminar la tanda ${
          activeBatches.name + " del evento "  
        }? Si la tanda es eliminada, los usuarios que adquirieron sus tickets en ésta no podrán ingresar al evento.`}
        btnAccept="Eliminar tanda"
        btnCancel="Cancelar"
        onClickAccept={() => deleteUser(activeBatches._id)}
      />
    </>
  );
}
