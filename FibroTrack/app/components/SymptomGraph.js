import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import colors from "../config/colors";

const screenWidth = Dimensions.get("window").width;

const severityLabels = {
  0: "None",
  1: "Mild",
  2: "Moderate",
  3: "High",
  4: "Severe",
  5: "Very Severe",
};

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
    let dates = [];
    let values = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const displayDate = d
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        .toUpperCase();

      dates.push(displayDate);
      if (data[symptom] && data[symptom][dateStr] !== undefined) {
        values.push(data[symptom][dateStr]);
      } else {
        values.push(null); // For react-native-chart-kit, use null for missing data
      }
    }
    return { labels: dates, values: values };
  };

  const { labels, values } = generateDataForPeriod(currentStartDate);

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
      <LineChart
        data={{
          labels: labels, // Assuming labels is an array of dates
          datasets: [{ data: values }], // Assuming values is an array of symptom severities
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // No decimal places needed for integer severity levels
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
          formatYLabel: (y) => severityLabels[y], // Use the mapping to convert severity levels to words
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
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
