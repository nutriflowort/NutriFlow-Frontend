import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { login } from "../../src/service/auth";
import { useRouter } from "expo-router";
import { useSession } from "@/context/SessionContext";

export default function LoginScreen() {
  // VARIABLES DE INPUT
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MENSAJE DE ERROR
  const [error, setError] = useState("");

  // VARIABLE DE NAVEGACION ENTRE PANTALLAS
  const router = useRouter();

  // HOOK DE SESION
  const { guardarSesion } = useSession();

  // FUNCION DEL BOTON LOGIN
  const cargarLogin = async () => {
    setError(""); // LIMPIA EL ERROR ANTERIOR
    try {
      // LLAMA A FUNCION AUTH (ADENTRO DE SRC/AUTH)
      const data = await login({ email, password });

      // GUARDA LA SESION → EL LAYOUT DETECTA EL CAMBIO Y REDIRIGE AUTOMATICAMENTE
      await guardarSesion(data.user);

      console.log("Login correcto:", data);
    } catch (error: any) {
      console.log("Error:", error.response?.data);
      // MUESTRA EL MENSAJE DE ERROR DEBAJO DEL BOTON
      setError("Credenciales inválidas. Verificá tu correo y contraseña.");
    }
  };

  // ACA EMPIEZA A CREAR LA PANTALLA
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <View style={styles.card}>
        <Text style={styles.brand}>NutriFlow</Text>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>
          Ingresá tu correo y contraseña para continuar
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} onPress={cargarLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </Pressable>

          {/* CARTEL DE ERROR - SOLO SE MUESTRA SI HAY UN ERROR */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.helper}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.registrate}>¿No tenés usuario? Registrate</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bgTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#DCFCE7",
  },
  bgBottom: {
    position: "absolute",
    bottom: -140,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#E0F2FE",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: "#166534",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
    lineHeight: 20,
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    fontSize: 15,
    color: "#0F172A",
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    textAlign: "center",
  },
  helper: {
    marginTop: 16,
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
  },
  registrate: {
    marginTop: 16,
    textAlign: "center",
    color: "#16A34A",
    fontSize: 13,
  },
});
