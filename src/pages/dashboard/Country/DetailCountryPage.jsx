import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CountryService } from '../../../services/country.service';

import { WhiteCard } from '../../../components/shared/cards/WhiteCard';
import Swal from 'sweetalert2';

export const DetailCountryPage = () => {
    const params = useParams();
    const {id} = params;

    const [data, setData] = useState({
        _id: "",
        nombre: "",
        prefijo: ""
    });

    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {paises} = await CountryService.getCountryById(id);
                setData(paises);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, [refreshData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const {nombre, prefijo} = data;

        const response = await CountryService.updateCountry(id, nombre, prefijo);
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

        setRefreshData(!refreshData);
    }

    console.log({data})

    return (
        <>
            <h1>Detalles País</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/country">Volver</Link>
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
                                        Prefijo:
                                    </label>
                                    <input
                                        type="text"
                                        name="prefijo"
                                        id="prefijo"
                                        placeholder="Prefijo"
                                        required
                                        value={data.prefijo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </WhiteCard>
        </>
    );
};

