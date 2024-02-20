import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppGraphs from "../components/AppGraphs";
import AppHeader from "../components/AppHeader";
import PainMapReport from "../components/PainMapReport";
import { fetchSymptomsData } from "../api/symptomService";
import SelectedDateContext from "../date/context";
import AuthContext from "../auth/context";

symptomData = {
  Pain: {},
  Fatigue: {
    "2024-01-01": 4,
    "2024-01-02": 5,
    "2024-01-03": 3,
    "2024-01-04": 2,

    "2024-01-31": 1,
  },
  Mood: {
    "2024-01-01": 5,
    "2024-01-02": 1,
    "2024-01-03": 3,
    "2024-01-04": 4,
    "2024-01-05": 2,

    "2024-01-31": 1,
  },
  "Brain Fog": {
    "2024-01-01": 1,
    "2024-01-02": 2,
    "2024-01-03": 3,
    "2024-01-04": 2,
    "2024-01-05": 3,
    "2024-01-06": 2,
  },
};

const MyFibroChartScreen = () => {
  const { user } = useContext(AuthContext);
  const { selectedDate } = useContext(SelectedDateContext);
  const [data, setData] = useState({});
  const [lastFetched, setLastFetched] = useState({ month: null, year: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        setIsLoading(true); // Start loading
        try {
          const year = selectedDate.getFullYear();
          const month = selectedDate.getMonth(); // JavaScript months are 0-indexed
          const fetchedData = await fetchSymptomsData(user.uid, year, month);
          setData(fetchedData); // Update state with fetched data
        } catch (error) {
          console.error("Error fetching symptoms data:", error);
          // Optionally, handle errors (e.g., set error state, show error message)
        }
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchData();
  }, [user, selectedDate]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <AppHeader />
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <AppGraphs data={data} />
        )}
        <PainMapReport />
      </ScrollView>
    </View>
  );
};

export default MyFibroChartScreen;

const styles = StyleSheet.create({});
