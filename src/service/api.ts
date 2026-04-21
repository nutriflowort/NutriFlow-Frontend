import axios from "axios";
import { API_URL_LOCALHOST } from "../config/env";

export const api = axios.create({
    baseURL: API_URL_LOCALHOST, //CAMBIAR ACA PARA TESTING O PRODUCCION 
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});