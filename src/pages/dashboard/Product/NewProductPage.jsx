import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { WhiteCard } from '../../../components/shared/cards/WhiteCard';
import { ProductService } from '../../../services/product.service';

export const NewProductPage = () => {
    const [cover, setCover] = useState(null);
    const [data, setData] = useState({
        nombre: "",
        precio: "",
        cover: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setCover(event.target.files[0]);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        const { nombre, precio } = data;
        const nuevoCover = cover;

        const response = await ProductService.createProduct(nombre, precio, nuevoCover);
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
            precio: "",
            cover: null
        });

        setCover(null);
    }

    return (
        <>
            <h1>Nuevo Producto</h1>
            <hr />
            <div className='mb-5'>
                <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/product">Volver</Link>
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
                                        Cover:
                                    </label>
                                    <input
                                        type="file"
                                        name="cover"
                                        id="cover"
                                        placeholder="Cover"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {cover && <img src={URL.createObjectURL(cover)} alt="Imagen Cover" />}
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

