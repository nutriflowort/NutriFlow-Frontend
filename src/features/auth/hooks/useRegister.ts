import { useState } from "react";
import { register } from "../services";
import { router } from "expo-router";

export function useRegister() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Paciente");
  const [error, setError] = useState("");

  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

  const validarRegistro = () => {
    const nombreLimpio = nombre.trim();
    const apellidoLimpio = apellido.trim();
    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpia = password.trim();

    if (!nombreLimpio || !apellidoLimpio || !emailLimpio || !passwordLimpia) {
      return "Completá todos los campos.";
    }

    if (
      !emailLimpio.includes("@") ||
      !emailLimpio.includes(".com") ||
      (!emailLimpio.includes("gmail") && !emailLimpio.includes("hotmail")) // Validación específica para Gmail o Hotmail, PENDIENTE DE REVISAR SI SE DEBE QUITAR ESTA RESTRICCIÓN
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

  // FUNCION DEL BOTON REGISTRAR
  const cargarRegistro = async () => {
    setError("");

    const mensajeError = validarRegistro();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      // LLAMA A FUNCION AUTH (ADENTRO DE SRC/FEATURES/AUTH)
      const data = await register({ nombre, apellido, email, password, rol });
      console.log("Registro correcto:", data);
      // Si el registro es exitoso, se activa el Pop-up
      setShowSuccessPopUp(true);
    } catch (error: any) {
      console.log("Error:", error.response?.data);
      // setError("No se pudo crear la cuenta. Verificá los datos ingresados.");
      setError(error.response?.data?.message || "Error desconocido. Intentá nuevamente.");
    }
  };

  // Función para manejar el cierre del Pop-up y la navegación
  const handleClosePopUp = () => {
    setShowSuccessPopUp(false);
    router.replace("/auth/login");
  };

  return {
    nombre,
    setNombre,
    apellido,
    setApellido,
    email,
    setEmail,
    password,
    setPassword,
    rol,
    setRol,
    error,
    showSuccessPopUp,
    handleClosePopUp,
    cargarRegistro,
  };
}
