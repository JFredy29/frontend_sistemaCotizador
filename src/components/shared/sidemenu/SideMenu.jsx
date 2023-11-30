import React from 'react';
import { NavLink } from 'react-router-dom';

import { SideMenuItem } from './SideMenuItem';
import { useAuthStore } from '../../../stores';

import './SideMenu.css';

const menuAdminItems = [
  { title: 'Dashboard', subTitle: 'Visualizar información', href: '/dashboard', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Cotizaciones', subTitle: 'Visualizar cotizaciones', href: '/dashboard/quotation', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Productos', subTitle: 'Visualizar productos', href: '/dashboard/product', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Servicios', subTitle: 'Visualizar servicios', href: '/dashboard/service', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Países', subTitle: 'Visualizar países', href: '/dashboard/country', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Departamentos', subTitle: 'Visualizar departamentos', href: '/dashboard/state', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Ciudades', subTitle: 'Visualizar ciudades', href: '/dashboard/city', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Teléfonos', subTitle: 'Visualizar teléfonos', href: '/dashboard/phone', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Direcciones', subTitle: 'Visualizar direcciones', href: '/dashboard/address', Icon: <i className="fas fa-tachometer-alt"></i> },
];

const menuUserItems = [
  { title: 'Dashboard', subTitle: 'Visualizar información', href: '/dashboard', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Cotizaciones', subTitle: 'Visualizar cotizaciones', href: '/dashboard/quotation', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Teléfonos', subTitle: 'Visualizar teléfonos', href: '/dashboard/phone', Icon: <i className="fas fa-tachometer-alt"></i> },
  { title: 'Direcciones', subTitle: 'Visualizar direcciones', href: '/dashboard/address', Icon: <i className="fas fa-tachometer-alt"></i> },
];

export const SideMenu = () => {
  const logoutUser = useAuthStore(state => state.logoutUser);
  const user = useAuthStore(state => state.user);

  return (
    <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll">
      {/*  Profile */ }
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido, </p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <i className="fas fa-user text-2xl"></i>
          </span>
          <span className="text-sm md:text-base font-bold">
            {user?.name}
          </span>
        </a>
      </div>

      {/* Menu Items */ }
      <nav id="nav" className="w-full px-6">
        {user.rol === "ADMINISTRADOR" 
          ? menuAdminItems.map(item => (
              <SideMenuItem key={item.href} {...item} />
          ))
          : menuUserItems.map(item => (
              <SideMenuItem key={item.href} {...item} />
          ))
        }

        {/* Logout */}
        <a onClick={logoutUser} className="mt-10">
          <div>
            <i className="fas fa-sign-out-alt"></i>
          </div>

          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">Salir</span>
            <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
          </div>
        </a>

      </nav>
    </div>
  );
};