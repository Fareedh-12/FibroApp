import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeBaseProvider } from "native-base";

import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import SymptomComponent from "../components/SymptomComponent";
import AppCalendar from "../components/AppCalendar";
import AppCheckBox from "../components/AppCheckBox";
import PainMap from "../components/PainMap";
import colors from "../config/colors";

const initialSymptoms = [
  { name: "Pain", visible: true },
  { name: "Fatigue", visible: true },
  { name: "Mood", visible: true },
  { name: "Brain Fog", visible: true },
  { name: "Sleep", visible: true },
  { name: "Physical Activity", visible: true },
];

const DailyFibroTrackScreen = () => {
  const [symptoms, setSymptoms] = useState(initialSymptoms);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleCheckboxToggle = (index) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index].visible = !newSymptoms[index].visible;
    setSymptoms(newSymptoms);
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <AppCalendar />
      <ScrollView style={styles.symptomsScrollContainer}>
        {symptoms
          .filter((s) => s.visible)
          .map((symptom, index) => (
            <SymptomComponent key={symptom.name} symptom={symptom.name} />
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonContainer} onPress={toggleModal}>
        <MaterialIcons
          name="dashboard-customize"
          size={40}
          color={colors.dark}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalView}>
            <ScrollView>
              {symptoms.map((symptom, index) => (
                <AppCheckBox
                  key={symptom.id || index} // Preferably use symptom.id if available
                  text={symptom.name}
                  value={symptom.name}
                  onValueChange={() => handleCheckboxToggle(index)}
                  isChecked={symptom.visible}
                />
              ))}
            </ScrollView>

            <AppButton text="Done" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DailyFibroTrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  symptomsScrollContainer: {
    maxHeight: 800,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Adjust width as needed
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
  },
});
