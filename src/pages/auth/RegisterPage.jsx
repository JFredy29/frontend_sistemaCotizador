import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { useAuthStore } from '../../stores';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const registerUser = useAuthStore(state => state.registerUser);

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const { nombre, apellido, email, password } = event.target;

        try {
            const registerResponse = await registerUser(nombre.value, apellido.value, email.value, password.value);
            console.log(registerResponse);

            if (!registerResponse.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: registerResponse.msg,
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
                text: "No se pudo registrar"
            });
        }
    }

    return (
        <>
            <h1 className="text-center text-rose-500 text-2xl font-bold mb-4">Registro</h1>

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold">Nombre:</label>
                    <input type="text" name="nombre" required autoFocus/>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Apellido:</label>
                    <input type="text" name="apellido" required/>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Email:</label>
                    <input type="email" name="email" required/>
                </div>

                <div className="mb-4">
                    <label className="block font-semibold">Password:</label>

                    <div className='flex gap-x-1'>
                        <input type={showPassword ? 'text' : 'password'} name="password" required/>
                        
                        <button type="button" onClick={togglePasswordVisibility} className='bg-white border border-gray-300 rounded-md py-2 px-3'>
                            {showPassword 
                                ? <i className="fas fa-eye-slash"></i>
                                : <i className="fas fa-eye"></i>
                            }
                        </button>
                    </div>
                </div>

                <button type="submit" className="bg-rose-500 py-2 border rounded-lg px-4 w-full sm:w-fit text-white text-center font-semibold text-lg">Registrarse</button>
            </form>

            <div className="mt-6 text-rose-500 text-center">
                <Link to="/auth/login" className="hover:underline">Ya tengo una cuenta, iniciar sesión</Link>
            </div>

            <div className="mt-3 text-rose-500 text-center">
                <Link to="/home" className="hover:underline">Ir al inicio</Link>
            </div>
        </>
    );
}
