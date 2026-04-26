import { useState } from "react";
import { forgotPassword } from "@/src/features/auth/services";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarCodigo = async () => {
    setError("");
    setMessage("");

    const emailLimpio = email.trim().toLowerCase();

    if (!emailLimpio) {
      setError("Ingresá tu correo.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
      setError("Ingresá un correo válido.");
      return false;
    }

    try {
      setLoading(true);
      const data = await forgotPassword({ email: emailLimpio });

      if (data.code) {
        console.log("[DEV] Código recibido:", data.code);
      }

      if (data.resetLink) {
        console.log("[DEV] Reset link:", data.resetLink);
      }

      setMessage(
        data.message || "Si el correo existe, recibirás instrucciones.",
      );
      return true;
    } catch {
      setError("No pudimos enviar el código. Intentá de nuevo.");
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
    enviarCodigo,
  };
}
