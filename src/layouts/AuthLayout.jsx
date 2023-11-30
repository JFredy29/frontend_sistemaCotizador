import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';

import HeroAuth from "../components/assets/auth/hero.png";

export const AuthLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const checkAuthStatus = useAuthStore(state => state.checkAuthStatus);

    if (authStatus === "pending") {
        checkAuthStatus();
        return <>Loading...</>;
    }

    if (authStatus === "authorized") {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center">
                <img src={HeroAuth}
                alt="Placeholder Image"
                className="object-cover w-full h-full" />
            </div>

            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <Outlet />
            </div>
        </div>
    );
};