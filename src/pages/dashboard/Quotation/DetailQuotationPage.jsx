import { useEffect, useState } from 'react';
import { WhiteCard } from '../../../components/shared/cards/WhiteCard';

import { ProductService } from '../../../services/product.service';
import { ServiceService } from '../../../services/service.service';

import { useQuotationStore } from '../../../stores/quotation/quotation.store';
import { useAuthStore } from '../../../stores';
import { QuotationService } from '../../../services/quotation.service';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import { AddressService } from '../../../services/address.service';
import { PhoneService } from '../../../services/phone.service';

const SelectProducts = () => {
    const params = useParams();
    const {id} = params;

    const [products, setProducts] = useState([])

    const addProduct = useQuotationStore(state => state.addProduct);
    const removeProduct = useQuotationStore(state => state.removeProduct);

    const productos = useQuotationStore(state => state.productos);
    const setProductos = useQuotationStore(state => state.setProductos);

    console.log({productos});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { productos } = await ProductService.getAllProducts();
                setProducts(productos);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { cotizaciones } = await QuotationService.getQuotationById(id);
                setProductos(cotizaciones.productos);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <h2>Paso 1: Productos</h2>
            <p className='font-semibold'> - Seleccione los productos:</p>
            <div className='flex flex-wrap'>
                {products.map(product => {
                    return <div key={product._id} className='w-28 bg-white-500 shadow-xl m-2 gap-4' onClick={() => addProduct(product)}>
                        <img src={product.cover} className='h-28' />
                        <div>
                            <p>{product.nombre}</p>
                            <p>{product.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                        </div>
                    </div>
                })}
            </div>

            <p className='font-semibold'>Mis productos seleccionados:</p>
            <div className='flex flex-wrap'>
                {productos.map(producto => {
                    
                    return <div key={`${producto._id} - ${producto.nombre}`} className='w-28 bg-white-500 shadow-xl m-2 gap-4'>
                        <img src={producto.cover} className='h-28' />
                        <div>
                            <p>{producto.nombre}</p>
                            <p>{producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>

                            <div className='flex justify-between mt-2'>
                                <button className='bg-red-500 px-2 font-semibold' type="button" onClick={() => removeProduct(producto._id)}>-</button>

                                <p className='font-semibold'>{producto.cantidad}</p>

                                <button className='bg-green-500 px-2 font-semibold' type="button" onClick={() => addProduct(producto)}>+</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        
    );
}

const SelectServices = () => {
    const params = useParams();
    const {id} = params;

    const [services, setServices] = useState([]);

    const addService = useQuotationStore(state => state.addService);
    const removeService = useQuotationStore(state => state.removeService);

    const servicios = useQuotationStore(state => state.servicios);
    const setServicios = useQuotationStore(state => state.setServicios);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { servicios } = await ServiceService.getAllServices();
                setServices(servicios);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { cotizaciones } = await QuotationService.getQuotationById(id);
                setServicios(cotizaciones.servicios);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <h2>Paso 2: Servicios</h2>
            <p className='font-semibold'> - Seleccione los servicios:</p>
            <div className='flex flex-wrap'>
                {services.map(service => {
                    return <div key={service._id} className='w-28 bg-white-500 shadow-xl m-2 gap-4' onClick={() => addService(service)}>
                        <img src={service.cover} className='h-28' />
                        <div>
                            <p>{service.nombre}</p>
                            <p>{service.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                        </div>
                    </div>
                })}
            </div>

            <p className='font-semibold'>Mis servicios seleccionados:</p>
            <div className='flex flex-wrap'>
                {servicios.map(servicio => {
                    return <div key={`${servicio._id} - ${servicio.nombre}`} className='w-28 bg-white-500 shadow-xl m-2 gap-4'>
                        <img src={servicio.cover} className='h-28' />
                        <div>
                            <p>{servicio.nombre}</p>
                            <p>{servicio.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>

                            <div className='flex justify-between mt-2'>
                                <button className='bg-red-500 px-2 font-semibold' type="button" onClick={() => removeService(servicio._id)}>-</button>

                                <p className='font-semibold'>{servicio.cantidad}</p>

                                <button className='bg-green-500 px-2 font-semibold' type="button" onClick={() => addService(servicio)}>+</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        
    );
}

const ResumenQuotation = () => {
    const params = useParams();
    const {id} = params;

    const [data, setData] = useState({});
    const [address, setAddress] = useState([]);
    const [phones, setPhones] = useState([]);

    const user = useAuthStore(state => state.user);
    const productos = useQuotationStore(state => state.productos);
    const servicios = useQuotationStore(state => state.servicios);

    const getTotalPrice = useQuotationStore(state => state.getTotalPrice);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { cotizaciones } = await QuotationService.getQuotationById(id);
                setData(cotizaciones.idUsuario);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const { direcciones } = await AddressService.getAddressByUser(user.uid);
                setAddress(direcciones);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchAddress();
    }, []);

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const { telefonos } = await PhoneService.getPhonesByUser(user.uid);
                setPhones(telefonos);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchPhones();
    }, []);

    console.log({data})

    return (
        <div>
            <h2>Paso 3: Resumen de Cotización</h2>

            {user.rol === "ADMINISTRADOR" && 
                <div>
                    <p className='font-semibold text-xl'>Usuario:</p>
                    <p><strong>Nombre:</strong> {data.nombre}</p>
                    <p><strong>Apellido:</strong> {data.apellido}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                </div>
            }

            <p className='font-semibold mt-2'>Productos:</p>
            <ul>
                {
                    productos.map(producto => {
                        const totalprice = producto.cantidad * producto.precio

                        return <li key={producto._id}>
                            <div className='flex gap-x-2'>
                                <p>- {producto.nombre}</p>
                                <p>x{producto.cantidad}</p>
                                <p>{producto.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                                <p className='font-semibold'>= {totalprice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                            </div>
                        </li>
                    }) 
                }
            </ul>
            
            <p className='font-semibold mt-2'>Servicios:</p>
            <ul>
                {
                    servicios.map(servicio => {
                        const totalprice = servicio.cantidad * servicio.precio

                        return <li key={servicio._id}>
                            <div className='flex gap-x-2'>
                                <p>- {servicio.nombre}</p>
                                <p>x{servicio.cantidad}</p>
                                <p>{servicio.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                                <p className='font-semibold'>= {totalprice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
                            </div>
                        </li>
                    }) 
                }
            </ul>

            <p className='mt-5 font-bold text-xl'>Total: {getTotalPrice().toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP</p>
        </div> 
    );
}

const MultiStepForm = () => {
    const params = useParams();
    const {id} = params;

    const user = useAuthStore(state => state.user)
    const productos = useQuotationStore(state => state.productos);
    const servicios = useQuotationStore(state => state.servicios);

    const getTotalPrice = useQuotationStore(state => state.getTotalPrice);
    const clearStore = useQuotationStore(state => state.clearStore);

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const productosCotizacion = productos.map(producto => {
            const {_id, cantidad, precio} = producto;
            
            return {"producto": _id, cantidad, precio}
        })

        const serviciosCotizacion = servicios.map(servicio => {
            const {_id, cantidad, precio} = servicio;

            return {"servicio": _id, cantidad, precio}
        })

        const total = getTotalPrice()

        const response = await QuotationService.updateQuotation(id, user.uid, serviciosCotizacion, productosCotizacion, total);

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

        clearStore();
        setStep(1)
    };

    const renderSwitch = (step) => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <SelectProducts />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <SelectServices />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <ResumenQuotation />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {renderSwitch(step)}
            {step !== 1 && (
                <button type='button' onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 mt-4 mr-4">
                    Anterior
                </button>
            )}
            {step !== 3 && <button type='button' onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 mt-4">Siguiente</button>}
            {step === 3 && (
            <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Actualizar</button>
            )}
        </form>
    );
};


export const DetailQuotationPage = () => {
    

    return (
        <>
        <h1>Detalles Cotización</h1>
        <hr />
        <div className='mb-5'>
            <Link className="bg-stone-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded" to="/dashboard/quotation">Volver</Link>
        </div>

        <WhiteCard className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[450px]">
                <MultiStepForm />
            </div>
        </WhiteCard>
        </>
    );
};

