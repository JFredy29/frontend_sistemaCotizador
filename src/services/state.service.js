import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class StateService {
    static getAllStates = async() => {
        const { data } = await clientApi.get("/state");
        return data;
    }

    static getStateById = async(idState) => {
        const { data } = await clientApi.get(`/state/${idState}`);
        return data;
    }

    static createState = async(nombre, idPais) => {
        try {
            const { data } = await clientApi.post("/state/create", {nombre, idPais}, {
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

    static updateState = async(idState, nombre, idPais) => {
        try {
            const { data } = await clientApi.put(`/state/update/${idState}`, {nombre, idPais}, {
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

    static deleteState = async(idState) => {
        try {
            const { data } = await clientApi.delete(`/state/delete/${idState}`);
            
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