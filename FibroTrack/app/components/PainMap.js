import { StyleSheet, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Body from "react-native-body-highlighter";
import AuthContext from "../auth/context";
import SelectedDateContext from "../date/context";
import {
  updateOrCreatePainData,
  fetchPainDataForDate,
} from "../api/symptomService";

const PainMap = () => {
  const [viewSide, setViewSide] = useState("front");
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const { selectedDate } = useContext(SelectedDateContext);

  // Define the colors array outside the component if it doesn't change, or keep it inside if it does
  const colors = [
    "#FFCC00", // Mild Pain
    "#FF9900", // Moderate Pain
    "#FF6666", // Moderate to Severe Pain
    "#FF0000", // Severe Pain
  ];

  useEffect(() => {
    if (user && selectedDate) {
      const loadPainData = async () => {
        try {
          const fetchedData = await fetchPainDataForDate(
            user.uid,
            selectedDate
          );
          setData(fetchedData);
        } catch (error) {
          Alert.alert("Error", "Failed to load pain data.");
          console.error(error);
        }
      };

      loadPainData();
    }
  }, [selectedDate, user]);

  const handleBodyPartPress = (bodyPart) => {
    // Check if the body part is already in the data
    const existingPartIndex = data.findIndex(
      (item) => item.slug === bodyPart.slug
    );

    let newData;
    if (existingPartIndex !== -1) {
      // Calculate the next intensity
      const currentItem = data[existingPartIndex];
      const newIntensity = currentItem.intensity + 1;

      if (newIntensity > colors.length) {
        // If the new intensity exceeds the number of colors, remove the body part
        newData = data.filter((_, index) => index !== existingPartIndex);
      } else {
        // Otherwise, update its intensity
        newData = data.map((item, index) => {
          if (index === existingPartIndex) {
            return { ...item, intensity: newIntensity };
          }
          return item;
        });
      }
    } else {
      // If the body part doesn't exist, add it with an initial intensity of 1
      newData = [...data, { slug: bodyPart.slug, intensity: 1 }];
    }

    setData(newData);
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateOrCreatePainData(user.uid, selectedDate, data);
        alert("Pain data saved successfully!");
      } catch (error) {
        alert("Failed to save pain data. Please try again.");
        console.error(error);
      }
    } else {
      alert("You must be logged in to save data.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Front" onPress={() => setViewSide("front")} />
        <Button title="Save" onPress={handleSave} />
        <Button title="Back" onPress={() => setViewSide("back")} />
      </View>
      <Body
        data={data}
        gender="female"
        side={viewSide}
        scale={1.7}
        onBodyPartPress={handleBodyPartPress}
        colors={colors}
      />
    </View>
  );
};

export default PainMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});
