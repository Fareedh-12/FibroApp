import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import AppHeading from "./AppHeading";

const AppHeader = () => {
  return (
    <View style={styles.container}>
      {/* <Entypo name="menu" size={24} color="black" /> */}
      <AppHeading size={20}>FibroTrack</AppHeading>
      {/* <AntDesign name="user" size={24} color="black" />     */}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
