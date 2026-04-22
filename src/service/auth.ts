import { api } from "./api";

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
};

export type UserDto = {
  id: string;
  nombre: string;
  email: string;
};

export type LoginResponse = {
  message: string;
  user: UserDto;
};

// Registro devuelve la misma estructura que login
export type RegisterResponse = LoginResponse;

// FUNCION QUE PEGA EN EL ENDPOINT DEL BACKEND - LOGIN
export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  // USA LA URL "API" QUE ESTA EN ("API.TS" ADENTRO DE SRC/SERVICE) ESTO RECIBE UN LOGIN RESPONSE.
  const response = await api.post<LoginResponse>("/login", { email, password });

  // RESPUESTA
  return response.data;
};

// FUNCION QUE PEGA EN EL ENDPOINT DEL BACKEND - REGISTER
export const register = async ({
  nombre,
  apellido,
  email,
  password,
}: RegisterRequest): Promise<RegisterResponse> => {
  // USA LA URL "API" QUE ESTA EN ("API.TS" ADENTRO DE SRC/SERVICE) ESTO RECIBE UN REGISTER RESPONSE.
  const response = await api.post<RegisterResponse>("/register", {
    nombre,
    apellido,
    email,
    password,
  });

  // RESPUESTA
  return response.data;
};