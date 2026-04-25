import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_LOCALHOST } from "@/src/shared/config/env";
import { SESSION_TOKEN_KEY } from "@/src/shared/constants/storage";

export const api = axios.create({
  baseURL: API_URL_LOCALHOST, //CAMBIAR ACA PARA TESTING O PRODUCCION
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
