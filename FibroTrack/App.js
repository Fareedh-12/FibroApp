import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./app/components/Screen";
import DailyFibroTrackScreen from "./app/screens/DailyFibroTrackScreen";

export default function App() {
  return (
    <Screen>
      <DailyFibroTrackScreen />
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
