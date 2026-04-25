import { useState } from "react";
import { register } from "../services";

export function useRegister() {
  const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("Paciente");
    

// FUNCION DEL BOTON REGISTRAR
  const cargarRegistro = async () => {
    try {
      // LLAMA A FUNCION AUTH (ADENTRO DE SRC/FEATURES/AUTH)
      const data = await register({ nombre, apellido, email, password, rol });
      console.log("Registro correcto:", data);
    } catch (error: any) {
      console.log("Error:", error.response?.data);
    }
    };
    
    return { nombre, setNombre, apellido, setApellido, email, setEmail, password, setPassword, rol, setRol, cargarRegistro };
}
