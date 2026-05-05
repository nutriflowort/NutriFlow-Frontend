import { api } from "@/src/shared/services/api";

export const sendPatientInvitation = async ({
  email,
}: {
  email: string;
}) => {
  const response = await api.post("/nutritionist/patient-invitations", {
    email,
  });

  return response.data;
};
