import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/src/shared/hooks/use-color-scheme";
import {
  SessionProvider,
  useSession,
} from "@/src/shared/context/SessionContext";

// COMPONENTE SEPARADO PARA PODER USAR EL HOOK useSession DENTRO DEL PROVIDER
function RootLayoutNav() {
  const { user, loading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const segmentsArray = segments as string[];
    const enPantallaAuth = segmentsArray[0] === "auth";
    const intentandoEntrarANutri = segmentsArray.includes("(nutritionist)");
    const intentandoEntrarAPaciente = segmentsArray.includes("(patient)");
    const enWelcome = segmentsArray.includes("(welcome)");

    // CASO 1: NO HAY SESIÓN
    if (!user) {
      if (!enWelcome && !enPantallaAuth) {
        router.replace("/(welcome)"); // Si no está en welcome ni auth, lo mandamos a welcome
      }
      return;
    }

    // CASO 2: HAY SESIÓN PERO ESTÁ EN LOGIN O BIENVENIDA
    if (enWelcome || enPantallaAuth) {
      const homePath =
        user.rol === "nutricionista" ? "/(nutritionist)" : "/(patient)";
      router.replace(homePath as any);
      return;
    }

    // CASO 3: PROTECCIÓN DE RUTAS (SEGURIDAD)
    if (user.rol === "paciente" && intentandoEntrarANutri) {
      // Si es paciente y quiere entrar a rutas de nutri, lo rebotamos a su index
      router.replace("/(patient)");
    } else if (user.rol === "nutricionista" && intentandoEntrarAPaciente) {
      // Si es nutri y quiere entrar a rutas de paciente, lo rebotamos
      router.replace("/(nutritionist)");
    }
    
  }, [user, loading, segments]);
  console.log("Estado actual - User:", !!user, "Ruta:", segments);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#16A34A" size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     {/* Puedes definir las rutas aquí para mayor control */}
  //     <Stack.Screen name="index" />
  //     <Stack.Screen name="auth" options={{ navigationBarHidden: true }} />
  //   </Stack>
  // );

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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
});
