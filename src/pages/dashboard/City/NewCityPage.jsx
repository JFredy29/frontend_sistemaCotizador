import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { WhiteCard } from '../../../components/shared/cards/WhiteCard';
import { StateService } from '../../../services/state.service';
import { CityService } from '../../../services/city.service';


export const NewCityPage = () => {
    const [states, setStates] = useState([]);
    const [data, setData] = useState({
        nombre: "",
        idDepartamento: ""
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { estados } = await StateService.getAllStates();
                setStates(estados);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchCountries();
    }, []);

    console.log(data);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const { nombre, idDepartamento } = data;

        const response = await CityService.createCity(nombre, idDepartamento);
        console.log(response);

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Good Job",
                text: response.msg,
                confirmButtonColor: "#F43F5E",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: response.msg,
                confirmButtonColor: "#F43F5E",
            });
        }

        setData({
            nombre: "",
            prefijo: ""
        });
    }

    return (
        <>
            <h1>Nueva Ciudad</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/city">Volver</Link>
            </div>
            
            <WhiteCard className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={ onSubmit }>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Nombre:
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        placeholder="Nombre"
                                        required
                                        value={data.nombre}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Departamento:
                                    </label>
                                    <select name="idDepartamento" value={data.idDepartamento} onChange={handleChange}>
                                        <option value="">Seleccionar</option>

                                        {states.map(state => {
                                            const {_id, nombre} = state;
                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded">
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </WhiteCard>
        </>
    );
};

