import { api } from "@/src/shared/services/api";

type LoginRequest = {
  email: string;
  password: string;
};

export type UserDto = {
  id: string;
  nombre: string;
  email: string;
  rol: string; 
};

export type LoginResponse = {
  message: string;
  user: UserDto;
  token: string;
};

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", { email, password }); // Realiza la petición POST al endpoint de login con las credenciales
  return response.data;
};
