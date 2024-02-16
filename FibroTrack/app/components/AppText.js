import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const AppText = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    // fontFamily: 'manrope',
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 15,
    textAlign: "center",
  },
});
