import { StyleSheet, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import colors from "../config/colors";

const AppInput = ({ icon, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={25} color={colors.dark} />
      )}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.medium,
    borderRadius: 10,
    flexDirection: "row",
    width: "95%",
    padding: 15,
    marginVertical: 10,
    height: 60,
    alignSelf: "center",
  },
  textInput: {
    fontSize: 18,
    color: colors.dark,
    marginLeft: 10,
    width: "100%",
  },
});
