import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AppDropDown from "./AppDropDown";
import AppGraph from "./AppGraph";

const AppGraphs = ({ data }) => {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setSelectedSymptom(Object.keys(data)[0]);
    }
  }, [data]);

  if (Object.keys(data).length === 0) {
    return <Text>No data available</Text>; // Or any other placeholder content
  }

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
