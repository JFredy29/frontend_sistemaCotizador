import { AxiosError } from "axios";
import { clientApi } from "../api/config";

// export interface LoginResponse {
//     id:       string;
//     email:    string;
//     fullName: string;
//     isActive: boolean;
//     roles:    string[];
//     token:    string;
// }

// export interface User {
//     ok:    boolean;
//     msg:   string;
//     uid:   string;
//     name:  string;
//     rol:   string;
//     token: string;
// }

export class AuthService {
    static login = async(email, password) => {
        try {
            const { data } = await clientApi.post("/auth/login", {email, password});

            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Login");
        }
    }

    static register = async(nombre, apellido, email, password) => {
        try {
            const { data } = await clientApi.post("/auth/create", {nombre, apellido, email, password});

            console.log(data);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                throw new Error(error.response?.data);
            }

            console.log(error);
            throw new Error("Unable to Register");
        }
    }

    static checkStatus = async() => {
        try {
            const { data } = await clientApi.get("/auth/check-status");

            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Unauthorized");
        }
    }
}