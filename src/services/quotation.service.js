import { AxiosError } from "axios";
import { clientApi } from "../api/config";

export class QuotationService {
    static getAllQuotations = async() => {
        const { data } = await clientApi.get("/quotation");
        return data;
    }

    static getQuotationByUser = async(idUsuario) => {
        const { data } = await clientApi.get(`/quotation/user/${idUsuario}`);
        return data;
    }

    static getQuotationById = async(idQuotation) => {
        const { data } = await clientApi.get(`/quotation/${idQuotation}`);
        return data;
    }

    static createQuotation = async(idUsuario, servicios, productos, total) => {
        try {
            const { data } = await clientApi.post("/quotation/create", {idUsuario, servicios, productos, total}, {
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

    static updateQuotation = async(idQuotation, idUsuario, servicios, productos, total) => {
        try {
            const { data } = await clientApi.put(`/quotation/update/${idQuotation}`, {idUsuario, servicios, productos, total}, {
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

    static changeStatusQuotation = async(idQuotation, estado) => {
        try {
            const { data } = await clientApi.put(`/quotation/change-status/${idQuotation}`, {estado}, {
                headers: {'Content-Type': 'application/json'}
            });
            
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Change Status");
        }
    }

    static deleteQuotation = async(idQuotation) => {
        try {
            const { data } = await clientApi.delete(`/quotation/delete/${idQuotation}`);
            
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