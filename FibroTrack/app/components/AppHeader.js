import { StyleSheet, View } from "react-native";
import React from "react";
import AppHeading from "./AppHeading";

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <AppHeading size={20}>FibroTrack</AppHeading>
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
