import { Navigate, Outlet, useLocation } from 'react-router-dom';

import LandingNavBar from './components/navbar/LandingNavBar';
import Footer from './components/shared/Footer';

export const Root = () => {
    const { pathname } = useLocation();

    if (pathname === '/') {
        return <Navigate to="/home" />;
    }
    
    return (
        <>
            <LandingNavBar />
            <main className='min-h-[400px] mt-24'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}