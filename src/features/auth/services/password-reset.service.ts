import { api } from "@/src/shared/services/api";

type ForgotPasswordRequest = {
  email: string;
};

type ResetPasswordRequest = {
  email?: string;
  code: string;
  newPassword: string;
  confirmPassword?: string;
};

type PasswordResetApiResponse = {
  success?: boolean;
  Success?: boolean;
  message?: string;
  Message?: string;
  code?: string;
  Code?: string;
  resetLink?: string;
  ResetLink?: string;
};

export type PasswordResetResponse = {
  success: boolean;
  message: string;
  code: string;
  resetLink: string;
};

function normalizePasswordResetResponse(
  data: PasswordResetApiResponse,
): PasswordResetResponse {
  return {
    success: data.success ?? data.Success ?? true,
    message: data.message ?? data.Message ?? "",
    code: data.code ?? data.Code ?? "",
    resetLink: data.resetLink ?? data.ResetLink ?? "",
  };
}

export const forgotPassword = async ({
  email,
}: ForgotPasswordRequest): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetApiResponse>(
    "/auth/forgot-password",
    {
      email,
    },
  );

  return normalizePasswordResetResponse(response.data);
};

export const resetPassword = async ({
  code,
  newPassword,
  confirmPassword,
}: ResetPasswordRequest): Promise<PasswordResetResponse> => {
  const response = await api.post<PasswordResetApiResponse>(
    "/auth/reset-password",
    {
      token: code,
      newPassword,
      confirmPassword: confirmPassword || newPassword,
    },
  );

  return normalizePasswordResetResponse(response.data);
};
