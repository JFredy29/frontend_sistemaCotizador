import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class CountryService {
    static getAllCountries = async() => {
        const { data } = await clientApi.get("/country");
        return data;
    }

    static getCountryById = async(idProducto) => {
        const { data } = await clientApi.get(`/country/${idProducto}`);
        return data;
    }

    static createCountry = async(nombre, prefijo) => {
        try {
            const { data } = await clientApi.post("/country/create", {nombre, prefijo}, {
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

    static updateCountry = async(idProduct, nombre, prefijo) => {
        try {
            const { data } = await clientApi.put(`/country/update/${idProduct}`, {nombre, prefijo}, {
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

    static deleteCountry = async(idProduct) => {
        try {
            const { data } = await clientApi.delete(`/country/delete/${idProduct}`);
            
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