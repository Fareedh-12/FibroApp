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

const sampleData = {
  "2024-01-01": 3,
  "2024-01-02": 2,
  "2024-01-03": 4,
  "2024-01-04": 5,
  "2024-01-05": 1,
  "2024-01-06": 1,
  "2024-01-07": 3,
  "2024-01-08": 1,
  "2024-01-09": 4,
  "2024-01-10": 5,
  "2024-01-11": 1,
  "2024-01-12": 2,
  "2024-01-13": 4,
  "2024-01-14": 3,
  "2024-01-15": 4,
  "2024-01-16": 5,
  "2024-01-17": 2,
  "2024-01-18": 3,
  "2024-01-19": 4,
  "2024-01-20": 5,
  "2024-01-21": 4,
  "2024-01-22": 3,
  "2024-01-23": 1,
  "2024-01-24": 2,
  "2024-01-25": 5,
  "2024-01-26": 5,
  "2024-01-27": 4,
  "2024-01-28": 3,
  "2024-01-29": 4,
  "2024-01-30": 5,
  "2024-01-31": 2,
};

// Adjusted function to get data from symptomData based on the startDate
const getDataForSevenDays = (startDate, symptomData) => {
  let data = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    if (symptomData[dateString] !== undefined) {
      data.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        severity: symptomData[dateString],
      });
    }
  }
  return data;
};
const severityLabels = [
  "Absent",
  "Slight",
  "Medium",
  "High",
  "Intense",
  "Critical",
];

const AppGraph = ({ symptomData }) => {
  const [startDate, setStartDate] = useState(new Date());

  const data = getDataForSevenDays(startDate, symptomData);

  const shiftDateRange = (days) => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + days);
    setStartDate(newStartDate);
  };

  const formatDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 6); // Adjust for 7-day range
    return `${start.getMonth() + 1}/${start.getDate()} - ${
      end.getMonth() + 1
    }/${end.getDate()}`;
  };

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
    alignItems: "center",
    backgroundColor: "#f5fcff",
    paddingVertical: 20,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
