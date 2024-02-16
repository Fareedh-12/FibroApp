import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";

import Constants from "expo-constants";

const Screen = (props) => {
  return <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
