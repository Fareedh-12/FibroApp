import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { fetchSymptomsData } from "../api/symptomService";
import AuthContext from "../auth/context";
import SelectedDateContext from "../date/context";
import { date } from "yup";

const Tryout = () => {
  const { user } = useContext(AuthContext);
  const { selectedDate } = useContext(SelectedDateContext);
  const [symptomData, setSymptomData] = useState({});
  newdate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        // Check if user object and user.uid are available
        const data = await fetchSymptomsData(
          user.uid,
          newdate.getFullYear(),
          newdate.getMonth()
        );
        setSymptomData(data);
      }
    };

    fetchData();
  }, [user, selectedDate]);
  console.log(symptomData);

  return (
    <View>
      <Text>Tryout</Text>
    </View>
  );
};

export default Tryout;

const styles = StyleSheet.create({});
