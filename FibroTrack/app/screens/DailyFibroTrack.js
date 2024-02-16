import { StyleSheet, View } from "react-native";
import React from "react";
import AppHeader from "../components/AppHeader";
import SymptomGraphs from "../components/SymptomGraphs";

symptomData = {
  Pain: {
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
  },
  Fatigue: {
    "2024-01-01": 4,
    "2024-01-02": 5,
    "2024-01-03": 3,
    "2024-01-04": 2,
    "2024-01-05": 2,
    "2024-01-06": 2,
    "2024-01-07": 4,
    "2024-01-08": 2,
    "2024-01-09": 4,
    "2024-01-10": 5,
    "2024-01-11": 1,
    "2024-01-12": 4,
    "2024-01-13": 4,
    "2024-01-14": 1,
    "2024-01-15": 2,
    "2024-01-16": 1,
    "2024-01-17": 1,
    "2024-01-18": 2,
    "2024-01-19": 3,
    "2024-01-20": 3,
    "2024-01-21": 3,
    "2024-01-22": 3,
    "2024-01-23": 3,
    "2024-01-24": 1,
    "2024-01-25": 3,
    "2024-01-26": 3,
    "2024-01-27": 5,
    "2024-01-28": 5,
    "2024-01-29": 4,
    "2024-01-30": 1,
    "2024-01-31": 1,
  },
  Mood: {
    "2024-01-01": 5,
    "2024-01-02": 1,
    "2024-01-03": 3,
    "2024-01-04": 4,
    "2024-01-05": 2,
    "2024-01-06": 3,
    "2024-01-07": 1,
    "2024-01-08": 1,
    "2024-01-09": 2,
    "2024-01-10": 1,
    "2024-01-11": 1,
    "2024-01-12": 1,
    "2024-01-13": 3,
    "2024-01-14": 4,
    "2024-01-15": 2,
    "2024-01-16": 4,
    "2024-01-17": 1,
    "2024-01-18": 4,
    "2024-01-19": 4,
    "2024-01-20": 5,
    "2024-01-21": 2,
    "2024-01-22": 4,
    "2024-01-23": 3,
    "2024-01-24": 4,
    "2024-01-25": 4,
    "2024-01-26": 5,
    "2024-01-27": 1,
    "2024-01-28": 3,
    "2024-01-29": 3,
    "2024-01-30": 3,
    "2024-01-31": 1,
  },
  "Brain Fog": {
    "2024-01-01": 1,
    "2024-01-02": 2,
    "2024-01-03": 3,
    "2024-01-04": 2,
    "2024-01-05": 3,
    "2024-01-06": 2,
    "2024-01-07": 1,
    "2024-01-08": 2,
    "2024-01-09": 2,
    "2024-01-10": 2,
    "2024-01-11": 1,
    "2024-01-12": 3,
    "2024-01-13": 3,
    "2024-01-14": 2,
    "2024-01-15": 3,
    "2024-01-16": 5,
    "2024-01-17": 1,
    "2024-01-18": 5,
    "2024-01-19": 3,
    "2024-01-20": 4,
    "2024-01-21": 1,
    "2024-01-22": 5,
    "2024-01-23": 4,
    "2024-01-24": 1,
    "2024-01-25": 2,
    "2024-01-26": 5,
    "2024-01-27": 2,
    "2024-01-28": 2,
    "2024-01-29": 2,
    "2024-01-30": 4,
    "2024-01-31": 3,
  },
};

const DailyFibroTrack = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <SymptomGraphs data={symptomData} />
    </View>
  );
};

export default DailyFibroTrack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%",
  },
});
