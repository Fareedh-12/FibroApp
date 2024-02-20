import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

const IconNavigation = ({ onLeftClick, onRightClick, centerText }) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="left"
        size={20}
        color={colors.dark}
        onPress={onLeftClick}
      />
      <Text>{centerText}</Text>
      <AntDesign
        name="right"
        size={20}
        color={colors.dark}
        onPress={onRightClick}
      />
    </View>
  );
};

export default IconNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
});
