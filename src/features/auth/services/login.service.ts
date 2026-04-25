import { api } from "@/src/shared/services/api";

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

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", { email, password }); // Realiza la petición POST al endpoint de login con las credenciales
  return response.data;
};
