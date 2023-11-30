import axios from "axios";
import { useAuthStore } from "../stores";

const clientApi = axios.create({
    baseURL: "http://localhost:3000/api"
})

clientApi.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config;
    }
)

export {
    clientApi
}