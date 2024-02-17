import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const SymptomSliderComponent = ({ symptom, onValueChange }) => {
  const [sliderValue, setSliderValue] = useState(3); // Start from a neutral value

  const getSliderColor = (value) => {
    const colors = [
      "#00ff00",
      "#ffdd00",
      "#ffbf00",
      "#ff9100",
      "#ff6a00",
      "#ff0400",
    ];
    return colors[value];
  };

  const valueDescriptions = {
    0: "No Symptoms",
    1: "Very Mild",
    2: "Mild",
    3: "Moderate",
    4: "Severe",
    5: "Very Severe",
  };

  // Update the slider value and call the onValueChange
  const handleValueChange = (value) => {
    setSliderValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.symptomText}>{symptom}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={5}
        step={1}
        value={sliderValue}
        onValueChange={(value) => {
          setSliderValue(value);
          if (onValueChange) {
            onValueChange(symptom, value);
          }
        }}
        minimumTrackTintColor={getSliderColor(sliderValue)}
      />
      <Text style={styles.labelText}>{valueDescriptions[sliderValue]}</Text>
    </View>
  );
};

export default SymptomSliderComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  symptomText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  slider: {
    width: "100%",
    maxWidth: 300,
  },
  labelText: {
    marginTop: 5,
    fontSize: 16,
  },
});
