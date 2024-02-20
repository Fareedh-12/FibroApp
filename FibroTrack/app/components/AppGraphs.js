import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import AppDropDown from "./AppDropDown";
import AppGraph from "./AppGraph";
import AppButton from "./AppButton";
import generateCommunityData from "../data/communitydata";

const AppGraphs = ({ data }) => {
  const [selectedSymptom, setSelectedSymptom] = useState([]);
  const [showCommunityData, setShowCommunityData] = useState(false);
  const symptoms = [
    "Brain Fog",
    "Fatigue",
    "Mood",
    "Physical Activity",
    "Sleep",
  ];
  const startDate = new Date(2024, 1, 1); // February 1, 2024
  const endDate = new Date(2024, 1, 28); // February 28, 2024
  const communityData = generateCommunityData(symptoms, startDate, endDate);

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
      <AppGraph
        symptomData={data[selectedSymptom]}
        communityData={communityData[selectedSymptom]}
        showCommunityData={showCommunityData}
      />
      <View style={styles.buttonContainer}>
        <AppButton
          text="Compare with community data"
          type="primary"
          width={300}
          onPress={() => setShowCommunityData(!showCommunityData)}
        />
      </View>

      <AppDropDown options={Object.keys(data)} onSelect={setSelectedSymptom} />
    </>
  );
};

export default AppGraphs;

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
  },
  buttonContainer: {
    alignItems: "center",
  },
});
