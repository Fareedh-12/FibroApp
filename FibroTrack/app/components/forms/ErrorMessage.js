import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ErrorMessage = (props) => {
  if (!props.visible || !props.error) return null;
  return <Text style={styles.text}>{props.error}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  text: {
    color: "red",
    marginLeft: 15,
    fontSize: 15,
  },
});
