import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import SymptomSliderComponent from "./SympomSliderComponent";

const SymptomComponent = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [symptomData, setSymptomData] = useState({});
  const currentDate = new Date().toISOString().split("T")[0];

  const handleSymptomChange = (symptom, value) => {
    setSymptomData((prevData) => ({
      ...prevData,
      [currentDate]: {
        ...prevData[currentDate],
        [symptom]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(symptomData);
  }, [symptomData]);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
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
          <SymptomSliderComponent
            symptom={props.symptom}
            onValueChange={handleSymptomChange}
          />
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
  input: {
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});
