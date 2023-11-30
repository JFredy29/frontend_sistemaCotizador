import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import { WhiteCard } from '../../../components/shared/cards/WhiteCard';

import { useAuthStore } from '../../../stores';
import { CityService } from '../../../services/city.service';
import { AddressService } from '../../../services/address.service';

export const DetailAddressPage = () => {
    const user = useAuthStore(state => state.user);
    const params = useParams();
    const {id} = params;

    const [cities, setCities] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const [data, setData] = useState({
        _id: "",
        direccion: "",
        barrio: "",
        idCiudad: ""
    });

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { ciudades } = await CityService.getAllCities();
                setCities(ciudades);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchCities();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { direcciones } = await AddressService.getAddressById(id);
                setData(direcciones);
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
        const {direccion, barrio, idCiudad} = data;

        const response = await AddressService.updateAddress(id, direccion, user.uid, barrio, idCiudad);
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
            <h1>Detalles Teléfono</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/address">Volver</Link>
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
                                        Dirección:
                                    </label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        placeholder="Dirección"
                                        required
                                        value={data.direccion}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Barrio:
                                    </label>
                                    <input
                                        type="text"
                                        name="barrio"
                                        id="barrio"
                                        placeholder="Barrio"
                                        required
                                        value={data.barrio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Ciudad:
                                    </label>   
                                    <select name="idCiudad" value={data.idCiudad._id} onChange={handleChange}>
                                        <option value="">Seleccionar</option>
                                        {cities.map(state => {
                                            const {_id, nombre} = state;

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

