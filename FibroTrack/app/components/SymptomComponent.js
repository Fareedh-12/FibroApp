import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import PainMap from "./PainMap"; // Ensure this path is correct
import SymptomSliderComponent from "./SymptomSliderComponent";

const SymptomComponent = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine which component to render based on the symptom
  const renderComponentBasedOnSymptom = () => {
    if (props.symptom === "Pain") {
      return <PainMap />;
    } else {
      return (
        <SymptomSliderComponent
          symptom={props.symptom}
          onValueChange={(value) => console.log(value)} // Implement your own onValueChange logic
        />
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Text style={styles.text}>{props.symptom}</Text>
        <AntDesign
          name={isExpanded ? "down" : "right"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.inputContainer}>
          {renderComponentBasedOnSymptom()}
        </View>
      )}
    </View>
  );
};

export default SymptomComponent;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // for Android
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  inputContainer: {
    padding: 15,
  },
});
