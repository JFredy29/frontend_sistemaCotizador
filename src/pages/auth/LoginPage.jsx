import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { useAuthStore } from '../../stores';

export const LoginPage = () => {
    const navigate = useNavigate();
    const loginUser = useAuthStore(state => state.loginUser);

    const user  = useAuthStore(state => state.user);
    console.log(user);

    const status  = useAuthStore(state => state.status);
    console.log(status)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const { email, password } = event.target;

        try {
            const loginResponse = await loginUser(email.value, password.value);
            console.log(loginResponse)

            if (!loginResponse.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: loginResponse.msg,
                    confirmButtonColor: "#F43F5E",
                });
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo autenticar"
            });
        }
    }

    return (
        <>
            <h1 className="text-center text-rose-500 text-2xl font-bold mb-4">Ingreso</h1>

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold">Email:</label>
                    <input type="email" name="email" required autoFocus/>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Password:</label>

                    <div className='flex gap-x-1'>
                        <input type={showPassword ? 'text' : 'password'} required name="password"/>
                        
                        <button type="button" onClick={togglePasswordVisibility} className='bg-white border border-gray-300 rounded-md py-2 px-3'>
                            {showPassword 
                                ? <i className="fas fa-eye-slash"></i>
                                : <i className="fas fa-eye"></i>
                            }
                        </button>
                    </div>
                </div>

                <div className="mb-6 text-rose-500">
                <a href="#" className="hover:underline">Olvidó su contraseña?</a>
                </div>

                <button type="submit" className="bg-rose-500 py-2 border rounded-lg px-4 w-full sm:w-fit text-white text-center font-semibold text-lg">Ingresar</button>
            </form>

            <div className="mt-6 text-rose-500 text-center">
                <Link to="/auth/register" className="hover:underline">¿No tienes cuenta?, registrarse</Link>
            </div>

            <div className="mt-3 text-rose-500 text-center">
                <Link to="/home" className="hover:underline">Ir al inicio</Link>
            </div>
        </>
    )
}