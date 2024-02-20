import { StyleSheet, View, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Body from "react-native-body-highlighter";
import AuthContext from "../auth/context";
import { fetchPainMapDataForMonth } from "../api/symptomService";
import IconNavigation from "../navigation/IconNavigation";

const PainMap = () => {
  const [viewSide, setViewSide] = useState("front");
  const [averagedMonthData, setAveragedMonthData] = useState([]);
  const [selectedMonthData, setSelectedMonthData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { user } = useContext(AuthContext);

  const calculateAverageIntensity = (data) => {
    const slugIntensities = {};

    // Aggregate intensities for each slug
    Object.values(data).forEach((day) => {
      day.forEach(({ intensity, slug }) => {
        if (!slugIntensities[slug]) {
          slugIntensities[slug] = [];
        }
        slugIntensities[slug].push(intensity);
      });
    });

    // Calculate average intensity for each slug
    const averageIntensities = Object.entries(slugIntensities).map(
      ([slug, intensities]) => {
        const sum = intensities.reduce((acc, cur) => acc + cur, 0);
        const average = sum / intensities.length;
        // If scaling is needed, adjust the average calculation as required
        return { slug, intensity: Math.round(average * 10) / 10 }; // Rounds to 1 decimal for simplicity
      }
    );

    return averageIntensities;
  };

  useEffect(() => {
    if (user) {
      fetchPainMapDataForMonth(user.uid, currentYear, currentMonth)
        .then((fetchedData) => {
          // Transform the data into the desired format
          const transformedData = fetchedData.reduce((acc, currentItem) => {
            acc[currentItem.date] = currentItem.painMap;
            return acc;
          }, {});

          // Calculate average intensity right after data transformation
          const averagedData = calculateAverageIntensity(transformedData);
          // Update state with the transformed and averaged data
          setSelectedMonthData(transformedData);
          setAveragedMonthData(averagedData); // Assuming you have this state setter from previous adjustments
        })
        .catch((error) => console.error(error));
    }
  }, [user, currentMonth, currentYear]); // Dependencies array

  const handleMonthChange = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const displayMonth = `${monthNames[currentMonth]} ${currentYear}`;

  // Define the colors array outside the component if it doesn't change, or keep it inside if it does
  const colors = [
    "#FFCC00", // Mild Pain
    "#FF9900", // Moderate Pain
    "#FF6666", // Moderate to Severe Pain
    "#FF0000", // Severe Pain
  ];

  return (
    <View style={styles.container}>
      <IconNavigation
        onLeftClick={() => handleMonthChange(-1)}
        onRightClick={() => handleMonthChange(1)}
        centerText={displayMonth}
      />
      <View style={styles.buttonContainer}>
        <Button title="Front" onPress={() => setViewSide("front")} />
        <Button title="Back" onPress={() => setViewSide("back")} />
      </View>
      <Body
        data={averagedMonthData}
        gender="female"
        side={viewSide}
        scale={1.7}
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
