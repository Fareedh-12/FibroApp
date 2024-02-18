import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppHeading from "../components/AppHeading";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppHeading style={styles.heading} size={40}>
          FibroTrack
        </AppHeading>
        <AppText>
          Navigating Fibromyalgia Together: Connect, Heal, Thrive
        </AppText>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          onPress={() => navigation.navigate("Login")}
          text="Sign In"
          type="primary"
        />

        <AppButton
          onPress={() => navigation.navigate("SignUp")}
          text="Create Account"
          type="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textContainer: {
    alignItems: "center",
    position: "absolute",
    top: 300,
    width: 200,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
});
