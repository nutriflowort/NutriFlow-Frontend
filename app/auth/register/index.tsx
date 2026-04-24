import { register } from "@/services/auth";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
// import { register } from "../../src/service/auth"; // descomenta cuando tengas la función
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  // VARIABLES DE INPUT
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Paciente");

  //VARIABLE DE NAVEGACION ENTRE PANTALLAS
  const router = useRouter();

  // FUNCION DEL BOTON REGISTRAR
  const cargarRegistro = async () => {
    try {
      // LLAMA A FUNCION AUTH (ADENTRO DE SRC/AUTH)
      const data = await register({ nombre, apellido, email, password, rol });
      console.log("Registro correcto:", data);
    } catch (error: any) {
      console.log("Error:", error.response?.data);
    }
  };

  // ACA EMPIEZA A CREAR LA PANTALLA
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <View style={styles.card}>
        <Text style={styles.brand}>NutriFlow</Text>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Completá tus datos para comenzar</Text>

        <View style={styles.form}>
          {/* FILA: NOMBRE Y APELLIDO LADO A LADO */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Juan"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Pérez"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
                value={apellido}
                onChangeText={setApellido}
              />
            </View>
          </View>

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

          <Text style={styles.label}>Tipo de cuenta</Text>

          <View style={styles.selectContainer}>
            <Picker
              selectedValue={rol}
              onValueChange={(itemValue) => setRol(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Paciente" value="Paciente" />
              <Picker.Item label="Nutricionista" value="Nutricionista" />
            </Picker>
          </View>

          {/* BOTON REGISTRAR */}
          <Pressable style={styles.button} onPress={cargarRegistro}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.login}>
              ¿Ya tenés una cuenta? Iniciá sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ESTILOS DE LA PANTALLA (misma paleta que LoginScreen)
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
  // FILA PARA NOMBRE Y APELLIDO
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 0,
  },
  halfField: {
    flex: 1,
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
  helper: {
    marginTop: 16,
    textAlign: "center",
    color: "#64748B",
    fontSize: 13,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    height: 55,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  picker: {
    color: "#0F172A",
  },
  login: {
    marginTop: 16,
    textAlign: "center",
    color: "#16A34A",
    fontSize: 13,
  },
});
