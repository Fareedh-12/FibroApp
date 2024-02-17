import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./app/components/Screen";
import AppGraph from "./app/components/AppGraph";
import PainMap from "./app/components/PainMap";
import AppDropDown from "./app/components/AppDropDown";
import AppGraphs from "./app/components/AppGraphs";

const sampleData = {
  "2024-01-01": 3,
  "2024-01-02": 2,
  "2024-01-03": 4,
  "2024-01-04": 5,
  "2024-01-05": 1,
  "2024-01-06": 1,
  "2024-01-07": 3,
  "2024-01-08": 1,
  "2024-01-09": 4,
  "2024-01-10": 5,
  "2024-01-11": 1,
  "2024-01-12": 2,
  "2024-01-13": 4,
  "2024-01-14": 3,
  "2024-01-15": 4,
  "2024-01-16": 5,
  "2024-01-17": 2,
  "2024-01-18": 3,
  "2024-01-19": 4,
  "2024-01-20": 5,
  "2024-01-21": 4,
  "2024-01-22": 3,
  "2024-01-23": 1,
  "2024-01-24": 2,
  "2024-01-25": 5,
  "2024-01-26": 5,
  "2024-01-27": 4,
  "2024-01-28": 3,
  "2024-01-29": 4,
  "2024-01-30": 5,
  "2024-01-31": 2,
};

export default function App() {
  return (
    <Screen>
      <AppGraphs symptomData={sampleData} />
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
