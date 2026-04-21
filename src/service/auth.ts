import { api } from "./api";

type LoginRequest = {
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

//FUNCION QUE PEGA EN EL ENDPOINT DEL BACKEND
export const login = async ({email,password,}: LoginRequest): Promise<LoginResponse> => {

    //USA LA URL "API" QUE ESTA EN ("API.TS" ADENTRO DE SRC/SERVICE) ESTO RECIBE UN LOGIN RESPONSE.
    const response = await api.post<LoginResponse>("/login", {email,password,});

    //RESPUESTA
    return response.data;
};