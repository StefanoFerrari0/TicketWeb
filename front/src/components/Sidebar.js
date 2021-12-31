import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  TicketIcon,
  MusicNoteIcon,
  QrcodeIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { UserContext } from "../hooks/UserContext";
import AndLogo from "../images/Logo.png";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
    role: ["QR", "RRPP", "admin"],
  },
  {
    name: "Entradas",
    href: "/entradas/crear",
    icon: TicketIcon,
    role: ["RRPP", "admin"],
  },
  {
    name: "Eventos",
    href: "/eventos",
    icon: MusicNoteIcon,
    role: ["admin"],
  },
  {
    name: "Tandas",
    href: "/tandas",
    icon: ClipboardListIcon,
    role: ["admin"],
  },
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: UsersIcon,
    role: ["admin"],
  },
  {
    name: "Código QR",
    href: "/codigo-qr",
    icon: QrcodeIcon,
    role: ["QR", "admin"],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-10 w-auto"
                      src={AndLogo}
                      alt="And Producciones"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => {
                      var isActive = false;
                      if (item.name === props.nav) {
                        isActive = true;
                      }

                      const userRole = props.user.roles.name;
                      const isRol = item.role.find(
                        (element) => element === userRole
                      );

                      return (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            !isRol ? "hidden" : "",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          onClick={() =>  setSidebarOpen(false)}
                        >
                          <item.icon
                            className={classNames(
                              isActive
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              !isRol ? "hidden" : "",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex bg-gray-700 p-4">
                  <a
                    href="/settings-account/"
                    className="flex-shrink-0 group block"
                  >
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                        {props.user.name + " " + props.user.surname}
                        </p>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                          Configurar usuario
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-10 w-auto"
                  src={AndLogo}
                  alt="And Producciones"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                var isActive = false;
                if (item.name === props.nav) {
                  isActive = true;
                }

                  const userRole = props.user.roles.name;

                  const isRol = item.role.find(
                    (element) => element === userRole
                  );

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        !isRol ? "hidden" : "",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActive
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          !isRol ? "hidden" : "",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                    {props.user.name + " " + props.user.surname}
                    </p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                      Configurar usuario
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 h-full">{props.children}</main>
        </div>
      </div>
    </>
  );
}
