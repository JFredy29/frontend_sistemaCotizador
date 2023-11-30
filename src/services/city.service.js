import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class CityService {
    static getAllCities = async() => {
        const { data } = await clientApi.get("/city");
        return data;
    }

    static getCityById = async(idCity) => {
        const { data } = await clientApi.get(`/city/${idCity}`);
        return data;
    }

    static createCity = async(nombre, idDepartamento) => {
        try {
            const { data } = await clientApi.post("/city/create", {nombre, idDepartamento}, {
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

    static updateCity = async(idCity, nombre, idDepartamento) => {
        try {
            const { data } = await clientApi.put(`/city/update/${idCity}`, {nombre, idDepartamento}, {
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

    static deleteCity = async(idCity) => {
        try {
            const { data } = await clientApi.delete(`/city/delete/${idCity}`);
            
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