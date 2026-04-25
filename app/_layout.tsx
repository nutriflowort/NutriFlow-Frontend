import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/shared/hooks/use-color-scheme";
import { SessionProvider, useSession } from "@/src/shared/context/SessionContext";

// COMPONENTE SEPARADO PARA PODER USAR EL HOOK useSession DENTRO DEL PROVIDER
function RootLayoutNav() {
  const { user, loading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // ESPERA A QUE ASYNCSTORAGE TERMINE DE LEER
    if (loading) return;

    const enPantallaAuth = segments[0] === "auth";

    if (user && enPantallaAuth) {
      // TIENE SESION Y ESTA EN LOGIN/REGISTER → MANDA AL HOME
      router.replace("/main" as any);
    } else if (!user && !enPantallaAuth) {
      // NO TIENE SESION Y NO ESTA EN LOGIN/REGISTER → MANDA AL LOGIN
      router.replace("/auth/login");
    }
  }, [user, loading, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SessionProvider>
  );
}
