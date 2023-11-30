import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class AddressService {
    static getAllAddress = async() => {
        const { data } = await clientApi.get("/address");
        return data;
    }

    static getAddressByUser = async(idUsuario) => {
        const { data } = await clientApi.get(`/address/user/${idUsuario}`);
        return data;
    }

    static getAddressById = async(idAddress) => {
        const { data } = await clientApi.get(`/address/${idAddress}`);
        return data;
    }

    static createAddress = async(direccion, idUsuario, barrio, idCiudad) => {
        try {
            const { data } = await clientApi.post("/address/create", {direccion, idUsuario, barrio, idCiudad}, {
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

    static updateAddress = async(idAddress, direccion, idUsuario, barrio, idCiudad) => {
        try {
            const { data } = await clientApi.put(`/address/update/${idAddress}`, {direccion, idUsuario, barrio, idCiudad}, {
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

    static deleteAddress = async(idAddress) => {
        try {
            const { data } = await clientApi.delete(`/address/delete/${idAddress}`);
            
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