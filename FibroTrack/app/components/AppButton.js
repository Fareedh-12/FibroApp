import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import colors from "../config/colors";

const AppButton = ({ type, text, onPress, width, borderColor }) => {
  // Function to determine button style
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      width: width || "100%",
      marginVertical: 15,
    };

    if (type === "primary") {
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: borderColor || colors.black, // Use provided borderColor or default to colors.black
      };
    }
  };

  // Function to determine text style
  const getTextStyle = () => ({
    fontSize: 16,
    fontWeight: "500", // Standard medium weight
    color: type === "primary" ? colors.white : colors.black,
  });

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={getTextStyle()}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

// You might not need a separate StyleSheet object if styles are dynamically generated
// But if you have common styles that are not dependent on props, you can define them here
