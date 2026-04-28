import { useState } from "react";
import { useSession } from "@/src/shared/context/SessionContext"; 
import { login } from "@/src/features/auth/services";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { guardarSesion } = useSession();

  const validarLogin = () => {
    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpia = password.trim();

    if (!emailLimpio || !passwordLimpia) {
      return "Completá el correo y la contraseña.";
    }
    return "";
  };

  const cargarLogin = async () => {
    setError("");

    const mensajeError = validarLogin();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      const data = await login({ email, password }); // Llama al servicio de login con las credenciales ingresadas
      await guardarSesion(data.user, data.token);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error desconocido. Intentá nuevamente.",
      );
    }
  };

  return { email, setEmail, password, setPassword, error, cargarLogin };
}
