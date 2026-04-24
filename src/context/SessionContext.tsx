import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "@/services/auth";

const SESSION_KEY = "nutriflow_user";

type SessionContextType = {
  user: UserDto | null;
  loading: boolean;
  guardarSesion: (userData: UserDto) => Promise<void>;
  cerrarSesion: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

// PROVIDER QUE ENVUELVE TODA LA APP
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  // AL MONTAR, CHEQUEA SI HAY SESION GUARDADA
  useEffect(() => {
    const cargarSesion = async () => {
      try {
        const data = await AsyncStorage.getItem(SESSION_KEY);
        if (data) {
          setUser(JSON.parse(data));
        }
      } catch (error) {
        console.log("Error leyendo sesión:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarSesion();
  }, []);

  // GUARDA EL USUARIO EN ASYNCSTORAGE
  const guardarSesion = async (userData: UserDto) => {
    try {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log("Error guardando sesión:", error);
    }
  };

  // BORRA LA SESION (LOGOUT)
  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      setUser(null);
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ user, loading, guardarSesion, cerrarSesion }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// HOOK PARA USAR EL CONTEXT EN CUALQUIER PANTALLA
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe usarse dentro de SessionProvider");
  }
  return context;
}
