import { produce } from 'immer';
import { create } from 'zustand';

import { devtools, persist } from 'zustand/middleware';
import { immer } from "zustand/middleware/immer";

const storeApi = (set, get) => ({
    cotizaciones: [],
    productos: [],
    servicios: [],

    getCotizacionesByEstado: (estado) => {
        const cotizaciones = get().cotizaciones;
        return cotizaciones.filter(cotizacion => cotizacion.status === estado);
    },
    
    setCotizaciones: (nuevasCotizaciones) => {
        set(
            produce((draft) => {
                draft.cotizaciones = nuevasCotizaciones;
            })
        );
    },

    setProductos: (nuevosProductos) => {
        const productos = nuevosProductos.map(nuevoProducto => {
            const {producto, precio, cantidad} = nuevoProducto;
            const {_id, cover, nombre} = producto;

            return {"_id": _id, cover, nombre, precio, cantidad}
        })

        set(
            produce((draft) => {
                draft.productos = productos;
            })
        );
    },

    setServicios: (nuevosServicios) => {
        const servicios = nuevosServicios.map(nuevoServicio => {
            const {servicio, precio, cantidad} = nuevoServicio;
            const {_id, cover, nombre, descripcion} = servicio;

            return {"_id": _id, cover, nombre, descripcion, precio, cantidad}
        })

        set(
            produce((draft) => {
                draft.servicios = servicios;
            })
        );
    },

    addProduct: (producto) => {
        const nuevoProducto = producto;
        const { productos } = get();
    
        const productoExistenteIndex = productos.findIndex((product) => product._id === nuevoProducto._id);
    
        set(
            produce((draft) => {
                if (productoExistenteIndex === -1) {
                    draft.productos.push({
                        _id: nuevoProducto._id,
                        cover: nuevoProducto.cover,
                        nombre: nuevoProducto.nombre,
                        precio: nuevoProducto.precio,
                        cantidad: 1,
                    });
                } else {
                    draft.productos[productoExistenteIndex].cantidad += 1;
                }
            })
        );
    },

    removeProduct: (idProduct) => {
        const { productos } = get();
        const index = productos.findIndex(producto => producto._id === idProduct);
        const itemToUpdate = productos[index];
      
        const updatedProducts = itemToUpdate.cantidad === 1
            ? productos.filter(producto => producto._id !== idProduct)
            : productos.map(producto => {
                if (producto._id === idProduct) {
                    return {
                    ...producto,
                    cantidad: producto.cantidad - 1
                    };
                }
                return producto;
                });
      
        set(
            produce((draft) => {
                draft.productos = updatedProducts;
            })
        );
    },

    addService: (servicio) => {
        const nuevoServicio = servicio;
        const { servicios } = get();
    
        const servicioExistenteIndex = servicios.findIndex((service) => service._id === nuevoServicio._id);
    
        set(
            produce((draft) => {
                if (servicioExistenteIndex === -1) {
                    draft.servicios.push({
                        _id: nuevoServicio._id,
                        cover: nuevoServicio.cover,
                        nombre: nuevoServicio.nombre,
                        descripcion: nuevoServicio.descripcion,
                        precio: nuevoServicio.precio,
                        cantidad: 1,
                    });
                } else {
                    draft.servicios[servicioExistenteIndex].cantidad += 1;
                }
            })
        );
    },

    removeService: (idService) => {
        const { servicios } = get();
        const index = servicios.findIndex(servicio => servicio._id === idService);
        const itemToUpdate = servicios[index];
      
        const updatedServices = itemToUpdate.cantidad === 1
            ? servicios.filter(servicio => servicio._id !== idService)
            : servicios.map(servicio => {
                if (servicio._id === idService) {
                    return {
                    ...servicio,
                    cantidad: servicio.cantidad - 1
                    };
                }
                return servicio;
                });
      
        set(
            produce((draft) => {
                draft.servicios = updatedServices;
            })
        );
    },

    getTotalPrice: () => {
        const { productos, servicios } = get();
    
        const totalProductos = productos.reduce(
          (acc, producto) => acc + producto.precio * producto.cantidad,
          0
        );
    
        const totalServicios = servicios.reduce(
          (acc, servicio) => acc + servicio.precio * servicio.cantidad,
          0
        );
    
        return totalProductos + totalServicios;
    },
    
    clearStore: () => {
        set(
            produce((draft) => {
              draft.productos = [];
              draft.servicios = [];
            })
        );      
    }
});

export const useQuotationStore = create(
    devtools(
        persist(
            immer(
                storeApi
            ), {
                name: "quotation-storage"
            }
        )
    )
)