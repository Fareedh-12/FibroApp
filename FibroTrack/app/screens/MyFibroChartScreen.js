import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppGraphs from "../components/AppGraphs";
import AppHeader from "../components/AppHeader";
import PainMapReport from "../components/PainMapReport";
import { fetchSymptomsData } from "../api/symptomService";
import SelectedDateContext from "../date/context";
import AuthContext from "../auth/context";

symptomData = {
  Pain: {
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
  },
  Fatigue: {
    "2024-01-01": 4,
    "2024-01-02": 5,
    "2024-01-03": 3,
    "2024-01-04": 2,
    "2024-01-05": 2,
    "2024-01-06": 2,
    "2024-01-07": 4,
    "2024-01-08": 2,
    "2024-01-09": 4,
    "2024-01-10": 5,
    "2024-01-11": 1,
    "2024-01-12": 4,
    "2024-01-13": 4,
    "2024-01-14": 1,
    "2024-01-15": 2,
    "2024-01-16": 1,
    "2024-01-17": 1,
    "2024-01-18": 2,
    "2024-01-19": 3,
    "2024-01-20": 3,
    "2024-01-21": 3,
    "2024-01-22": 3,
    "2024-01-23": 3,
    "2024-01-24": 1,
    "2024-01-25": 3,
    "2024-01-26": 3,
    "2024-01-27": 5,
    "2024-01-28": 5,
    "2024-01-29": 4,
    "2024-01-30": 1,
    "2024-01-31": 1,
  },
  Mood: {
    "2024-01-01": 5,
    "2024-01-02": 1,
    "2024-01-03": 3,
    "2024-01-04": 4,
    "2024-01-05": 2,
    "2024-01-06": 3,
    "2024-01-07": 1,
    "2024-01-08": 1,
    "2024-01-09": 2,
    "2024-01-10": 1,
    "2024-01-11": 1,
    "2024-01-12": 1,
    "2024-01-13": 3,
    "2024-01-14": 4,
    "2024-01-15": 2,
    "2024-01-16": 4,
    "2024-01-17": 1,
    "2024-01-18": 4,
    "2024-01-19": 4,
    "2024-01-20": 5,
    "2024-01-21": 2,
    "2024-01-22": 4,
    "2024-01-23": 3,
    "2024-01-24": 4,
    "2024-01-25": 4,
    "2024-01-26": 5,
    "2024-01-27": 1,
    "2024-01-28": 3,
    "2024-01-29": 3,
    "2024-01-30": 3,
    "2024-01-31": 1,
  },
  "Brain Fog": {
    "2024-01-01": 1,
    "2024-01-02": 2,
    "2024-01-03": 3,
    "2024-01-04": 2,
    "2024-01-05": 3,
    "2024-01-06": 2,
    "2024-01-07": 1,
    "2024-01-08": 2,
    "2024-01-09": 2,
    "2024-01-10": 2,
    "2024-01-11": 1,
    "2024-01-12": 3,
    "2024-01-13": 3,
    "2024-01-14": 2,
    "2024-01-15": 3,
    "2024-01-16": 5,
    "2024-01-17": 1,
    "2024-01-18": 5,
    "2024-01-19": 3,
    "2024-01-20": 4,
    "2024-01-21": 1,
    "2024-01-22": 5,
    "2024-01-23": 4,
    "2024-01-24": 1,
    "2024-01-25": 2,
    "2024-01-26": 5,
    "2024-01-27": 2,
    "2024-01-28": 2,
    "2024-01-29": 2,
    "2024-01-30": 4,
    "2024-01-31": 3,
  },
};

const MyFibroChartScreen = () => {
  const { user } = useContext(AuthContext);
  const { selectedDate } = useContext(SelectedDateContext);
  const [data, setData] = useState({});
  const [lastFetchedMonth, setLastFetchedMonth] = useState(null);
  const [lastFetchedYear, setLastFetchedYear] = useState(null);

  useEffect(() => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    // Check if the month or year has changed
    if (user && (month !== lastFetchedMonth || year !== lastFetchedYear)) {
      fetchSymptomsData(user.uid, year, month)
        .then((fetchedData) => {
          setData(fetchedData); // Update state with fetched data
          setLastFetchedMonth(month); // Update the last fetched month
          setLastFetchedYear(year); // Update the last fetched year
        })
        .catch((error) => {
          console.error("Error fetching symptoms data:", error);
        });
    }
  }, [user, selectedDate, lastFetchedMonth, lastFetchedYear]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppHeader />
        <AppGraphs data={data} />
        <PainMapReport />
      </ScrollView>
    </View>
  );
};

export default MyFibroChartScreen;

const styles = StyleSheet.create({});
