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
    

    if (
      !emailLimpio.includes("@") ||
      !emailLimpio.includes(".com") ||
      (!emailLimpio.includes("gmail") && !emailLimpio.includes("hotmail"))
    ) {
      return "Ingresá un correo válido de Gmail o Hotmail.";
    }

    if (passwordLimpia.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(passwordLimpia)) {
      return "La contraseña debe tener al menos una mayúscula.";
    }

    if (!/[0-9._]/.test(passwordLimpia)) {
      return "La contraseña debe tener al menos un número, punto o guion bajo.";
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
    } catch {
      setError("Credenciales inválidas. Verificá tu correo y contraseña.");
    }
  };

  return { email, setEmail, password, setPassword, error, cargarLogin };
}
