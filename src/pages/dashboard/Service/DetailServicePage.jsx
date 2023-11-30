import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ServiceService } from '../../../services/service.service';

import { WhiteCard } from '../../../components/shared/cards/WhiteCard';
import Swal from 'sweetalert2';

export const DetailServicePage = () => {
    const params = useParams();
    const {id} = params;

    const [data, setData] = useState({
        _id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        cover: ""
    });

    const [newCover, setNewCover] = useState(null);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {servicios} = await ServiceService.getServiceById(id);
                setData(servicios);
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

    const handleFileChange = (event) => {
        setNewCover(event.target.files[0]);
    };

    const onSubmit = async(event) => {
        event.preventDefault();

        let cover = data.cover

        if (newCover) {
            cover = newCover;
        }

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('precio', data.precio);
        formData.append('cover',  cover);
        
        const response = await ServiceService.updateService(id, formData);
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
            <h1>Detalles Servicio</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/service">Volver</Link>
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
                                        Cover:
                                    </label>
                                    <img src={data.cover} />
                                </div>
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
                                        Descripción:
                                    </label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        id="descripcion"
                                        placeholder="Descripción"
                                        required
                                        value={data.descripcion}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Precio:
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        name="precio"
                                        id="precio"
                                        placeholder="Precio"
                                        required
                                        value={data.precio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="mb-3 block text-base font-medium text-rose-500"
                                    >
                                        Cambiar Cover:
                                    </label>
                                    <input
                                        type="file"
                                        name="cover"
                                        id="cover"
                                        placeholder="Cover"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {newCover && <img src={URL.createObjectURL(newCover)} alt="Imagen seleccionada" />}
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

