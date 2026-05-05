import { api } from "@/src/shared/services/api";

type RegisterRequest = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
};

export type RegisterResponse = {
  message: string;
  user: { id: string; nombre: string; email: string };
};

export const register = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
};
