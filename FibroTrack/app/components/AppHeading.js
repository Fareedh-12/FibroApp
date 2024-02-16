import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import colors from "../config/colors";

// Example of using Dimensions to make font size responsive
const { width } = Dimensions.get("window");
const baseFontSize = width / 20; // Adjust the divisor to scale the base font size

const AppHeading = ({ size, style, children }) => {
  return (
    <Text style={[styles.heading, { fontSize: size || baseFontSize }, style]}>
      {children}
    </Text>
  );
};

export default AppHeading;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Manrope", // Ensure the font is correctly linked in your project
    fontWeight: "bold",
    color: colors.black,
    textShadowColor: "rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
