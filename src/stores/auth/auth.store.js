import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthService } from "../../services/auth.service";

const storeApi = (set) => ({
    status: "pending",
    token: undefined,
    user: undefined,

    loginUser: async(email, password) => {
        try {
            const {token, ...user} = await AuthService.login(email, password);

            if (user.ok) {
                set({status: "authorized", token, user}, false, "loginUser");
                return {"ok": true, "msg": user.msg}
            } else {
                return {"ok": false, "msg": user.msg || Object.values(user.errors)[0].msg}
            }
        } catch (error) {
            set({status: "unauthorized",token: undefined, user: undefined}, false, "loginUser");
            throw new Error("Unathorized");
        }
    },
    registerUser: async(nombre, apellido, email, password) => {
        try {
            const {token, ...user} = await AuthService.register(nombre, apellido, email, password);
            console.log(user);
            console.log(user.ok)

            if (user.ok) {
                set({status: "authorized", token, user}, false, "registerUser");
                return {"ok": true, "msg": user.msg}
            } else {
                return {"ok": false, "msg": user.msg || Object.values(user.errors)[0].msg}
            }
        } catch (error) {
            set({status: "unauthorized",token: undefined, user: undefined}, false, "registerUser");
            throw new Error("Unathorized");
        }
    },
    checkAuthStatus: async() => {
        try {
            const {token, ...user} = await AuthService.checkStatus();
            set({status: "authorized", token, user});
        } catch (error) {
            set({status: "unauthorized", token:undefined, user:undefined});
        }
    },
    logoutUser: () => {
        set({status: "unauthorized" ,token: undefined, user:undefined});
    },
});

export const useAuthStore = create(
    devtools(
        persist(
            storeApi,
            {name: "auth-storage"}
        )
    )
)