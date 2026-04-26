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
  if (loading) return;

  const segmentsArray = segments as string[];

  // Basado en tus logs:
  const isAtWelcome = segmentsArray.length === 0;
  const isAtAuth = segmentsArray.includes("auth");
  const isInsideApp = !isAtWelcome && !isAtAuth;

  if (!user) {
    // Si no hay usuario y estamos "dentro" (ej. en (patient)), redirigir a bienvenida
    if (isInsideApp) {
      router.replace("/");
    }
  } else {
    // Si hay usuario y estamos fuera, mandarlo a su lugar
    if (isAtWelcome || isAtAuth) {
      const homePath =
        user.rol === "nutricionista" ? "/(nutritionist)" : "/(patient)";
      // Usamos replace para limpiar el historial
      router.replace(homePath as any);
    }
  }
  console.log("Segmentos actuales:", segments)
}, [user, loading, segments]);
  
 if (loading) return null; // O un splash screen
  
  return <Stack screenOptions={{ headerShown: false }} />;
  
  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     {/* Puedes definir las rutas aquí para mayor control */}
  //     <Stack.Screen name="index" />
  //     <Stack.Screen name="auth" options={{ navigationBarHidden: true }} />
  //   </Stack>
  // );
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
