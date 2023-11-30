import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class ServiceService {
    static getAllServices = async() => {
        try {
            const { data } = await clientApi.get("/service");
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Get All Services");
        }
    }

    static getServiceById = async(idService) => {
        try {
            const { data } = await clientApi.get(`/service/${idService}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Get Service By Id");
        }
    }

    static createService = async(nombre, descripcion, precio, cover) => {
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);

            if (cover) {
                formData.append('cover', cover);
            }

            const { data } = await clientApi.post("/service/create", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Created Service");
        }
    }

    static updateService = async(idService, formData) => {
        try {
            const { data } = await clientApi.put(`/service/update/${idService}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Delete Service");
        }
    }

    static deleteService = async(idProduct) => {
        try {
            const { data } = await clientApi.delete(`/service/delete/${idProduct}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Delete Service");
        }
    }
}