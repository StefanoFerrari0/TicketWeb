import React, { useState, useEffect, useContext } from "react";
import Modal from "../../components/Modal";
import Stats from "../../components/Stats";
import TicketService from "../../api/services/ticket.service";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../../hooks/UserContext";

export default function Home({match}) {
  const { id } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendQrModal, setShowSendQrModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      getAllTickets(id);
    };
    fetchData();
  }, []);

  const getAllTickets = async (userId) => {
      await TicketService.getByUser(userId)
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

  const deleteTicket = async (ticketId) => {
    await TicketService.delete(ticketId)
      .then((res) => {
        if (res.data.ok) {
          var removeItem = data.filter(function (item) {
            return item._id !== ticketId;
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

  const sendQrCode = async (ticketId) => {
    await TicketService.sendQrCodeByEmail(ticketId)
      .then((res) => {
        if (res.data.ok) {
          console.log("Qr enviado");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const changeIsPay = async (ticketId, isPay) => {
    const info = {
      isPay: isPay,
    };

    await TicketService.edit(ticketId, info)
      .then((res) => {
        if (res.data.ok) {
          const refreshTicket = data.map((ticket, index) => {
            if (ticket._id === ticketId) {
              ticket.isPay = isPay;
            }
            return ticket;
          });

          setData(refreshTicket);

          console.log("Comisión editada.");
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
      <div className="max-w-8xl min-h-screen bg-gray-900 mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex flex-col">
        <Stats stats={[ {
                name: "Entradas vendidas:", 
                stat: data.length,
            }, {
                name: "Entradas restantes por cobrar: ",
                stat:  data.filter((value) => !value.isPay).length,
                moreInfo: `Total: $${data.filter((value) => !value.isPay).length * 100}`
            } , {
                name: "Entradas cobradas: ",
                stat:  data.filter((value) => value.isPay).length,
                moreInfo: `Total: $${data.filter((value) => value.isPay).length * 100}`
            }
        ]}/>

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
                        Comprador
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        RRPP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Comisión
                      </th>
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
                        Fecha de compra
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Precio
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
                    {data.map((ticket) => (
                      <tr key={ticket._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {ticket.name + " " + ticket.surname}
                              </div>
                              <div className="text-sm text-gray-500">
                                {ticket.email}
                              </div>
                              <div className="text-sm text-gray-500">
                                {ticket.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.user.name} {ticket.user.surname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                              ticket.isPay
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {ticket.isPay ? "Pagada" : "No pagada"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.batches.event.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Tanda: {ticket.batches.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment.utc(ticket.buyDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${ticket.batches.price}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-right text-sm font-medium flex justify-evenly gap-6">
    
                              <button type="button">
                                <Link
                                  to={`/entradas/editar/${ticket._id}`}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                >
                                  Editar
                                </Link>
                              </button>
                              <button
                                type="button"
                                className={`inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                  ticket.isPay
                                    ? "text-purple-700 bg-purple-100 hover:bg-purple-200 focus:ring-purple-500"
                                    : "text-green-700 bg-green-100 hover:bg-green-200  focus:ring-green-500"
                                }`}
                                onClick={() => {
                                  changeIsPay(ticket._id, !ticket.isPay);
                                }}
                              >
                                {ticket.isPay
                                  ? "Cambiar a no pagado"
                                  : "Cambiar a pagado"}
                              </button>                          

                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setActiveTicket(ticket);
                            }}
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => {
                              setShowSendQrModal(true);
                              setActiveTicket(ticket);
                            }}
                          >
                            Reenviar código QR
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
        title="Eliminar entrada"
        description={`Está seguro que desea eliminar la entrada de ${
          activeTicket.name + activeTicket.surname
        }? Si es eliminada el comprador no podrá acceder al evento, también será notificado via mail sobre la eliminación de ésta entrada.`}
        btnAccept="Eliminar tanda"
        btnCancel="Cancelar"
        onClickAccept={() => deleteTicket(activeTicket._id)}
      />
      <Modal
        open={showSendQrModal}
        setOpen={setShowSendQrModal}
        title="Reenviar Código QR"
        description={`Está seguro que desea reenviar el código qr a la persona ${
          activeTicket.name + activeTicket.surname
        }? Éste código le llegará al mail ${activeTicket.email}`}
        btnAccept="Reenviar"
        btnCancel="Cancelar"
        onClickAccept={() => sendQrCode(activeTicket._id)}
      />
    </>
  );
}
