import React from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import { useState } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
} from "victory-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

// Generates data for 7 days from a given start date
const generateDataForSevenDays = (startDate) => {
  return [...Array(7).keys()].map((i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return {
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      severity: Math.floor(Math.random() * 6), // Example: random severity
    };
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

const AppGraph = () => {
  const [startDate, setStartDate] = useState(new Date());

  const data = generateDataForSevenDays(startDate);

  const shiftDateRange = (days) => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + days);
    setStartDate(newStartDate);
  };

  // Function to format the displayed date range
  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 6); // Last day of the 7-day range
    return `${start.getMonth() + 1}/${start.getDate()} - ${
      end.getMonth() + 1
    }/${end.getDate()}`;
  };

  // Check if the end date is after the current date
  const isEndDateAfterToday = () => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return endDate > new Date();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <AntDesign
          name="left"
          size={20}
          color={colors.dark}
          onPress={() => shiftDateRange(-7)}
        />
        <Text>{formatDateRange()}</Text>
        <AntDesign
          name="right"
          size={20}
          color={isEndDateAfterToday() ? colors.lightGrey : colors.dark} // Use a lighter color to indicate disabled state
          onPress={() => !isEndDateAfterToday() && shiftDateRange(7)}
        />
      </View>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={data.map((_, i) => i + 1)}
          tickFormat={data.map((d) => d.date)}
          style={{
            tickLabels: { angle: -45, textAnchor: "end", fontSize: 10 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 1, 2, 3, 4, 5]}
          tickFormat={severityLabels}
          style={{
            tickLabels: { fontSize: 15, padding: 5 },
          }}
        />
        <VictoryLine
          data={data}
          x="date"
          y="severity"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            data: { stroke: "#c43a31" },
          }}
        />
        <VictoryScatter
          data={data}
          x="date"
          y="severity"
          size={7}
          style={{
            data: { fill: "#c43a31", stroke: "#ffffff", strokeWidth: 2 },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: "data",
                      mutation: (props) => {
                        const severityLevel =
                          severityLabels[props.datum.severity];
                        Alert.alert(
                          `Date: ${props.datum.date}`,
                          `Severity: ${severityLevel}`
                        );
                        return {}; // No mutation to state
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default AppGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});
