import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "@/src/features/auth/services/login.service";
import {
  SESSION_TOKEN_KEY,
  SESSION_USER_KEY,
} from "@/src/shared/constants/storage";

type SessionContextType = {
  user: UserDto | null;
  token: string | null;
  loading: boolean;
  guardarSesion: (userData: UserDto, tokenData: string) => Promise<void>;
  cerrarSesion: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

// PROVIDER QUE ENVUELVE TODA LA APP
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // AL MONTAR, CHEQUEA SI HAY SESION GUARDADA
  useEffect(() => {
    const cargarSesion = async () => {
      try {
        const [userData, tokenData] = await Promise.all([
          AsyncStorage.getItem(SESSION_USER_KEY),
          AsyncStorage.getItem(SESSION_TOKEN_KEY),
        ]);

        if (userData && tokenData) {
          setUser(JSON.parse(userData));
          setToken(tokenData);
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
  const guardarSesion = async (userData: UserDto, tokenData: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(SESSION_USER_KEY, JSON.stringify(userData)),
        AsyncStorage.setItem(SESSION_TOKEN_KEY, tokenData),
      ]);
      setUser(userData);
      setToken(tokenData);
    } catch (error) {
      console.log("Error guardando sesión:", error);
    }
  };

  // BORRA LA SESION (LOGOUT)
  const cerrarSesion = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(SESSION_USER_KEY),
        AsyncStorage.removeItem(SESSION_TOKEN_KEY),
      ]);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{ user, token, loading, guardarSesion, cerrarSesion }}
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
