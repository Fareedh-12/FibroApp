import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const AppHeading = (props) => {
  return (
    <Text style={[styles.heading, { fontSize: props.size }]}>
      {props.children}
    </Text>
  );
};

export default AppHeading;

const styles = StyleSheet.create({
  heading: {
    // fontFamily: 'manrope',
    fontSize: 35,
    fontWeight: "bold",
    color: colors.black,
  },
});
