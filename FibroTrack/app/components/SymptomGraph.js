import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

const screenWidth = Dimensions.get("window").width;

const severityLabels = [
  "None",
  "Mild",
  "Moderate",
  "High",
  "Severe",
  "Very Severe",
];

const SymptomGraph = ({ data, symptom }) => {
  const [currentStartDate, setCurrentStartDate] = useState(new Date());

  const navigateData = (direction) => {
    let newStartDate = new Date(currentStartDate);
    if (direction === "prev") {
      newStartDate.setDate(newStartDate.getDate() - 7);
    } else if (direction === "next") {
      newStartDate.setDate(newStartDate.getDate() + 7);
      if (newStartDate > new Date()) {
        newStartDate = new Date();
      }
    }
    setCurrentStartDate(newStartDate);
  };

  const formatDateRange = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    const formatOptions = { month: "short", day: "numeric" };
    const startStr = startDate.toLocaleDateString("en-US", formatOptions);
    const endStr = endDate.toLocaleDateString("en-US", formatOptions);
    return `${startStr} - ${endStr}`;
  };

  const generateDataForPeriod = (startDate) => {
    let dataPoints = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];

      if (data[symptom] && data[symptom][dateStr] !== undefined) {
        dataPoints.push({ x: i, y: data[symptom][dateStr] });
      } else {
        dataPoints.push({ x: i, y: 0 }); // Assuming 0 is "None"
      }
    }
    return dataPoints;
  };

  const processedData = generateDataForPeriod(currentStartDate);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <AntDesign
          name="left"
          size={20}
          color={colors.dark}
          onPress={() => navigateData("prev")}
        />
        <Text style={styles.dateRangeText}>
          {formatDateRange(currentStartDate)}
        </Text>
        <AntDesign
          name="right"
          size={20}
          color={colors.dark}
          onPress={() => navigateData("next")}
        />
      </View>
      <VictoryChart width={screenWidth}>
        <VictoryAxis
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          tickFormat={(t) => {
            const date = new Date(currentStartDate);
            date.setDate(date.getDate() + t);
            return date
              .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
              .toUpperCase();
          }}
        />
        <VictoryAxis dependentAxis tickFormat={(t) => severityLabels[t]} />
        <VictoryLine
          data={processedData}
          style={{
            data: { stroke: "#c43a31" },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  dateRangeText: {
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

export default SymptomGraph;
