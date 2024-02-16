import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
  VictoryScatter,
} from "victory-native";
import colors from "../config/colors";

const screenWidth = Dimensions.get("window").width;

const SymptomGraph = ({ data, symptom }) => {
  const [currentStartDate, setCurrentStartDate] = useState(new Date());

  // Adjust currentStartDate to move back or forward in time
  const navigateData = (direction) => {
    let newStartDate = new Date(currentStartDate);
    if (direction === "prev") {
      newStartDate.setDate(newStartDate.getDate() - 7);
    } else if (direction === "next") {
      newStartDate.setDate(newStartDate.getDate() + 7);
      // Prevent navigating into the future beyond today
      if (newStartDate > new Date()) {
        newStartDate = new Date();
      }
    }
    setCurrentStartDate(newStartDate);
  };

  const formatDateRange = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Get the end date of the week

    const formatOptions = { month: "short", day: "numeric" };
    const startStr = startDate.toLocaleDateString("en-US", formatOptions);
    const endStr = endDate.toLocaleDateString("en-US", formatOptions);

    return `${startStr} - ${endStr}`;
  };

  const generateDataForPeriod = (startDate) => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const displayDate = d
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        .toUpperCase();

      // Use the provided symptom prop to access the data
      if (data[symptom] && data[symptom][dateStr] !== undefined) {
        dates.push({ x: displayDate, y: data[symptom][dateStr] });
      } else {
        // If no data exists for this date for the given symptom, push a point with a y value of null
        dates.push({ x: displayDate, y: null });
      }
    }
    return dates;
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
          disabled={currentStartDate >= new Date()}
        />
      </View>
      <VictoryChart
        width={screenWidth - 20}
        domainPadding={{ x: 10, y: 10 }}
        padding={{ top: 20, bottom: 50, left: 25, right: 25 }}
      >
        <VictoryLine
          data={processedData}
          style={{ data: { stroke: "#4f83cc", strokeWidth: 3 } }}
          interpolation="natural"
        />
        <VictoryScatter
          data={processedData}
          size={7}
          style={{ data: { fill: "#c43a31" } }}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{ stroke: "tomato", strokeWidth: 2 }}
            />
          }
          labels={({ datum }) => `y: ${datum.y}`}
        />
        <VictoryAxis
          fixLabelOverlap
          style={{
            tickLabels: {
              fontSize: 10,
              padding: 5,
              angle: -45,
              textAnchor: "end",
            },
            grid: { stroke: "#ddd", strokeDasharray: "5,5" },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 5]}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
            grid: { stroke: "#ddd", strokeDasharray: "5,5" },
          }}
          tickFormat={(tick) => `${Math.round(tick)}`} // Round the tick to the nearest integer and convert to a string
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
