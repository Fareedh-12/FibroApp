import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import PainMap from "./app/components/PainMap";
import SignUpScreen from "./app/screens/SignUpScreen";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <Screen>
      <SignUpScreen />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
