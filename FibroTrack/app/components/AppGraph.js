import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
} from "victory-native";
import IconNavigation from "../navigation/IconNavigation";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

// Utility function to format date strings
const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

// Generates a fixed set of x-axis labels for the current 7-day period
const getWeekDays = (endDate) => {
  return [...Array(7)].map((_, i) => {
    const date = new Date(endDate);
    date.setDate(date.getDate() - (6 - i)); // Subtract to go back in time
    return formatDate(date);
  });
};

// Maps symptomData to the fixed set of x-axis labels
const mapDataToWeekDays = (endDate, symptomData) => {
  const dateFormat = (date) =>
    `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}`;

  return getWeekDays(endDate).map((dayLabel, index) => {
    const day = new Date(endDate);
    day.setDate(day.getDate() - (6 - index));
    const dayKey = dateFormat(day);
    const severity =
      symptomData[dayKey] !== undefined ? symptomData[dayKey] : null;
    return { date: dayLabel, severity };
  });
};

const severityLabels = [
  "Absent",
  "Slight",
  "Medium",
  "High",
  "Intense",
  "Critical",
];

const AppGraph = ({
  symptomData = {},
  communityData = {},
  showCommunityData,
}) => {
  const [endDate, setEndDate] = useState(new Date());

  // Adjust the function to map data to the fixed set of week days
  const data = mapDataToWeekDays(endDate, symptomData);
  const communityDataMapped = mapDataToWeekDays(endDate, communityData);

  const shiftDateRange = (days) => {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(newEndDate.getDate() + days);
    setEndDate(newEndDate);
  };

  const formatDateRange = () => {
    const start = new Date(endDate);
    start.setDate(start.getDate() - 6); // Adjust for 7-day range starting 6 days ago
    return `${formatDate(start)} - ${formatDate(endDate)}`;
  };

  return (
    <View style={styles.container}>
      <IconNavigation
        onLeftClick={() => shiftDateRange(-7)}
        onRightClick={() => shiftDateRange(7)}
        centerText={formatDateRange()}
      />
      <VictoryChart width={400} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={getWeekDays(endDate)}
          style={{
            tickLabels: { angle: -45, textAnchor: "end", fontSize: 10 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 1, 2, 3, 4, 5]}
          tickFormat={severityLabels}
          style={{ tickLabels: { fontSize: 15, padding: 5 } }}
        />
        <VictoryLine
          data={data}
          x="date"
          y={(datum) => (datum.severity !== null ? datum.severity : 0)}
          style={{ data: { stroke: "#c43a31" } }}
          animate={{ duration: 2000, onLoad: { duration: 1000 } }}
          interpolation="monotoneX"
        />

        <VictoryScatter
          data={data.filter((d) => d.severity !== null)}
          x="date"
          y="severity"
          size={7}
          style={{
            data: { fill: "#c43a31", stroke: "#ffffff", strokeWidth: 2 },
          }}
        />
        {showCommunityData && (
          <VictoryLine
            data={communityDataMapped}
            x="date"
            y={(datum) => (datum.severity !== null ? datum.severity : 0)}
            style={{ data: { stroke: "#30a3e6" } }} // Different color for community data
            animate={{ duration: 2000, onLoad: { duration: 1000 } }}
            interpolation="monotoneX"
          />
        )}
        {showCommunityData && (
          <VictoryScatter
            data={communityDataMapped.filter((d) => d.severity !== null)}
            x="date"
            y="severity"
            size={7}
            style={{
              data: { fill: "#30a3e6", stroke: "#ffffff", strokeWidth: 2 }, // Match community line color, with white stroke
            }}
          />
        )}
      </VictoryChart>
    </View>
  );
};

export default AppGraph;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
