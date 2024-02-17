import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppDropDown from "./AppDropDown";
import AppGraph from "./AppGraph";

// Sample data structure
const data = {
  symptom1: {
    "2024-02-17": 1,
    "2024-02-16": 2,
    "2024-02-15": 3,
    "2024-02-14": 4,
    "2024-02-13": 5,
    "2024-02-12": 1,
    "2024-02-11": 2,
  },
  symptom2: {
    "2024-02-17": 1,
    "2024-02-16": 3,
    "2024-02-15": 5,
    "2024-02-14": 2,
    "2024-02-13": 4,
    "2024-02-12": 1,
    "2024-02-11": 3,
  },
};

const AppGraphs = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(Object.keys(data)[0]);

  return (
    <>
      <AppGraph symptomData={data[selectedSymptom]} />
      <AppDropDown options={Object.keys(data)} onSelect={setSelectedSymptom} />
    </>
  );
};

export default AppGraphs;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
});
