import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import { WhiteCard } from '../../../components/shared/cards/WhiteCard';

import { StateService } from '../../../services/state.service';
import { CountryService } from '../../../services/country.service';

export const DetailStatePage = () => {
    const params = useParams();
    const {id} = params;
    const [countries, setCountries] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    const [data, setData] = useState({
        _id: "",
        nombre: "",
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { estados } = await StateService.getStateById(id);
                setData(estados);
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
        const {nombre, idPais} = data;

        const response = await StateService.updateState(id, nombre, idPais);
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
            <h1>Detalles Departamento</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/state">Volver</Link>
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
                                        País:
                                    </label>   
                                    <select name="idPais" value={data.idPais._id} onChange={handleChange}>
                                        <option value="">Seleccionar</option>
                                        {countries.map(country => {
                                            const {_id, nombre} = country;

                                            return <option key={_id} value={_id}>{nombre}</option>
                                        })}
                                    </select>
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

