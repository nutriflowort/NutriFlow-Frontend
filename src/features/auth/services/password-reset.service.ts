import { api } from "@/src/shared/services/api";

type ForgotPasswordRequest = {
  email: string;
};

type ResetPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type PasswordResetResponse = {
  message: string;
};

export const forgotPassword = async ({
  email,
}: ForgotPasswordRequest): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetResponse>("/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async ({
  email,
  code,
  newPassword,
}: ResetPasswordRequest): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetResponse>("/reset-password", {
    email,
    code,
    newPassword,
  });

  return response.data;
};
