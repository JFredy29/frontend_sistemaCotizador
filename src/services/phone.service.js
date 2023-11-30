import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class PhoneService {
    static getAllPhones = async() => {
        const { data } = await clientApi.get("/phone");
        return data;
    }

    static getPhonesByUser = async(idUser) => {
        const { data } = await clientApi.get(`/phone/user/${idUser}`);
        return data;
    }

    static getPhoneById = async(idPhone) => {
        const { data } = await clientApi.get(`/phone/${idPhone}`);
        return data;
    }

    static createPhone = async(telefono, idUsuario, idPais) => {
        try {
            const { data } = await clientApi.post("/phone/create", {telefono, idUsuario, idPais}, {
                headers: {'Content-Type': 'application/json'}
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

    static updatePhone = async(idPhone, telefono, idUsuario, idPais) => {
        try {
            const { data } = await clientApi.put(`/phone/update/${idPhone}`, {telefono, idUsuario, idPais}, {
                headers: {'Content-Type': 'application/json'}
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

    static deletePhone = async(idPhone) => {
        try {
            const { data } = await clientApi.delete(`/phone/delete/${idPhone}`);
            
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