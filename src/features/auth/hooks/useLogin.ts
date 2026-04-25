import { useState } from "react";
import { useRouter } from "expo-router";
import { useSession } from "@/src/shared/context/SessionContext"; 
import { login } from "@/src/features/auth/services";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { guardarSesion } = useSession();

  const cargarLogin = async () => {
    setError("");
    try {
      const data = await login({ email, password }); // Llama al servicio de login con las credenciales ingresadas
      await guardarSesion(data.user);
    } catch (error: any) {
      setError("Credenciales inválidas. Verificá tu correo y contraseña.");
    }
  };

  return { email, setEmail, password, setPassword, error, cargarLogin };
}
