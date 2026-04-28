import { useState } from "react";
import { resetPassword } from "@/src/features/auth/services";
import { router } from "expo-router"; 


export function useResetPassword(initialEmail = "") {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

  const cambiarPassword = async () => {
    setError("");
    setMessage("");

    const emailLimpio = email.trim().toLowerCase();
    const codeLimpio = code.trim();

    if (!emailLimpio || !codeLimpio || !newPassword) {
      setError("Completá todos los campos.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
      setError("Ingresá un correo válido.");
      return false;
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }

    try {
      setLoading(true);
      const data = await resetPassword({
        email: emailLimpio,
        code: codeLimpio,
        newPassword,
      });

      setShowSuccessPopUp(true);

      setMessage(data.message || "Contraseña actualizada correctamente.");
      return true;
    } catch {
      setError("No pudimos actualizar la contraseña. Revisá el código.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cierre del Pop-up y la navegación
  const handleClosePopUp = () => {
    setShowSuccessPopUp(false);
    router.replace("/auth/login");
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    setNewPassword,
    error,
    message,
    loading,
    showSuccessPopUp,
    handleClosePopUp,
    cambiarPassword,
  };
}
