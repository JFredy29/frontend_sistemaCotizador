import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { WhiteCard } from '../../../components/shared/cards/WhiteCard';
import { CountryService } from '../../../services/country.service';
import { PhoneService } from '../../../services/phone.service';
import { useAuthStore } from '../../../stores';

export const NewPhonePage = () => {
    const user = useAuthStore(state => state.user);
    console.log({user});

    const [countries, setCountries] = useState([]);

    const [data, setData] = useState({
        telefono: "",
        idPais: ""
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { paises } = await CountryService.getAllCountries();
                setCountries(paises);
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
        const { telefono, idPais } = data;

        const response = await PhoneService.createPhone(telefono, user.uid, idPais);
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
            telefono: "",
            idPais: ""
        });
    }

    return (
        <>
            <h1>Nuevo Teléfono</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/phone">Volver</Link>
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
                                        Teléfono:
                                    </label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        id="telefono"
                                        placeholder="Teléfono"
                                        required
                                        value={data.telefono}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        País:
                                    </label>
                                    <select name="idPais" value={data.idPais} onChange={handleChange}>
                                        <option value="">Seleccionar</option>

                                        {countries.map(state => {
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

