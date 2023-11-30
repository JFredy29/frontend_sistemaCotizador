import axios from "axios";
import { useAuthStore } from "../stores";

const clientApi = axios.create({
    baseURL: "https://backend-sistemacotizador-production.up.railway.app/api"
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
