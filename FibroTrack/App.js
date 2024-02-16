import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./app/components/Screen";
import SymptomGraph from "./app/components/SymptomGraph";

const sampleData = {
  headache: {
    "2024-02-10": 2,
    "2024-02-11": 3,
    "2024-02-12": 4,
    "2024-02-13": 5,
    "2024-02-14": 2,
    "2024-02-15": 0,
    "2024-02-16": 3,
  },
  nausea: {
    "2024-02-10": 1,
    "2024-02-11": 2,
    "2024-02-12": 0,
    "2024-02-13": 0,
    "2024-02-14": 1,
    "2024-02-15": 3,
    "2024-02-16": 2,
  },
};
export default function App() {
  return (
    <Screen>
      <SymptomGraph data={sampleData} symptom="headache" />

      {/* You can add more SymptomGraph components for different symptoms here */}
      {/* Example for Nausea */}
      <SymptomGraph data={sampleData} symptom="nausea" />
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
