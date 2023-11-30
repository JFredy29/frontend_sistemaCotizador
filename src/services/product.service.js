import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class ProductService {
    static getAllProducts = async() => {
        const { data } = await clientApi.get("/product");
        return data;
    }

    static getProductById = async(idProducto) => {
        const { data } = await clientApi.get(`/product/${idProducto}`);
        return data;
    }

    static createProduct = async(nombre, precio, cover) => {
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('precio', precio);

            if (cover) {
                formData.append('cover', cover);
            }

            const { data } = await clientApi.post("/product/create", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Created Product");
        }
    }

    static updateProduct = async(idProduct, formData) => {
        try {
            const { data } = await clientApi.put(`/product/update/${idProduct}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Delete Product");
        }
    }

    static deleteProduct = async(idProduct) => {
        try {
            const { data } = await clientApi.delete(`/product/delete/${idProduct}`);
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Delete Product");
        }
    }
}