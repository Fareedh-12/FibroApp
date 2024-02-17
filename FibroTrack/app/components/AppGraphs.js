import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppDropDown from "./AppDropDown";
import AppGraph from "./AppGraph";

const AppGraphs = ({ data }) => {
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
