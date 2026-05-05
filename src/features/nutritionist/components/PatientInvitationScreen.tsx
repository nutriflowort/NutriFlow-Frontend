import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { usePatientInvitation } from "../hooks/usePatientInvitation";

export function PatientInvitationScreen() {
  const { email, setEmail, error, message, loading, enviarInvitacion } =
    usePatientInvitation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <View style={styles.card}>
        <Text style={styles.brand}>NutriFlow</Text>
        <Text style={styles.title}>Invitacion de paciente</Text>
        <Text style={styles.subtitle}>
          Ingresa el correo del paciente para enviarle el enlace de invitacion.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electronico</Text>
          <TextInput
            style={styles.input}
            placeholder="paciente@correo.com"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={enviarInvitacion}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Enviando..." : "Enviar invitacion"}
            </Text>
          </Pressable>

          {message ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>{message}</Text>
            </View>
          ) : null}

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  successBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    padding: 12,
  },
  successText: {
    color: "#15803D",
    fontSize: 13,
    textAlign: "center",
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
});
