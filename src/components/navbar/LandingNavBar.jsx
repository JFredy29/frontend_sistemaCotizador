import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Drawer from '../shared/Drawer';
import { useAuthStore } from "../../stores";

import Logo from "../assets/shared/logo.png";

export default function LandingNavBar() {
    const authStatus = useAuthStore(state => state.status);

    const linkStyle = "hover:text-rose-500 hover:font-bold hover:cursor-pointer";
    const linkActiveStyle = "text-rose-500 font-bold"

    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    }

    return (
        <>
            <header className="fixed top-0 z-30 w-full grid items-center h-20 shadow-lg bg-white">
                <div className='contenedor flex justify-between'>
                    <Link className="w-40" to="/home">
                        <img className='object-cover' src={Logo} alt="Logo"/>
                    </Link>

                    <button onClick={handleDrawerToggle}>
                        <i className="fa fa-bars text-2xl text-rose-500"></i>
                    </button>
                </div>
            </header>

            <Drawer isOpen={isDrawerOpen} onClose={handleDrawerToggle}>
                <ul className="flex flex-col text-lg">
                    <hr/>
                    {
                        authStatus !== "authorized" 
                        ? ( 
                            <>
                                <NavLink onClick={closeDrawer} to="/auth/login" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Ingresar</NavLink>
                                <NavLink onClick={closeDrawer} to="/auth/register" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Registrarse</NavLink>
                            </>
                        ) 
                        : (
                            <>
                                <NavLink onClick={closeDrawer} to="/dashboard" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Ir al dashboard</NavLink>
                            </>
                        )
                    }
                    
                    
                    <hr/>
                    <NavLink onClick={closeDrawer} to="/home" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Inicio</NavLink>
                    <NavLink onClick={closeDrawer} to="/about" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Acerca de</NavLink>
                    <NavLink onClick={closeDrawer} to="/services" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Servicios</NavLink>
                    <NavLink onClick={closeDrawer} to="/contact" className={({isActive}) => isActive ? linkActiveStyle : linkStyle}>Contacto</NavLink>
                </ul>
            </Drawer>
        </>
    );
}
