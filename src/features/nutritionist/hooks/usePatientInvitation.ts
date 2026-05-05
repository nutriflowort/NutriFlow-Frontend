import { useState } from "react";
import { sendPatientInvitation } from "../services";

export function usePatientInvitation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarInvitacion = async () => {
    setError("");
    setMessage("");

    const emailLimpio = email.trim().toLowerCase();

    if (!emailLimpio) {
      setError("Ingresá el correo del paciente.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
      setError("Ingresá un correo válido.");
      return false;
    }

    try {
      setLoading(true);

      const data = await sendPatientInvitation({
        email: emailLimpio,
      });

      setMessage(data.message || "Invitación enviada correctamente.");
      setEmail("");

      return true;
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "No pudimos enviar la invitación. Intentá de nuevo.",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    error,
    message,
    loading,
    enviarInvitacion,
  };
}
