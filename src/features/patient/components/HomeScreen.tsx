import React from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { useSession } from "@/src/shared/context/SessionContext";

export function HomeScreen() {
  const { user, cerrarSesion } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <View style={styles.card}>
        <Text style={styles.brand}>NutriFlow</Text>
        <Text style={styles.welcome}>¡Bienvenido/a,</Text>
        <Text style={styles.nombre}>{user?.nombre}! 👋</Text>

        {/* BOTON CERRAR SESION - EL LAYOUT DETECTA EL CAMBIO Y REDIRIGE AL LOGIN */}
        <Pressable style={styles.button} onPress={cerrarSesion}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Pressable>
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
    alignItems: "center",
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
    marginBottom: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  nombre: {
    fontSize: 28,
    fontWeight: "800",
    color: "#16A34A",
    textAlign: "center",
    marginTop: 4,
  },
  button: {
    marginTop: 32,
    width: "100%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },
});
