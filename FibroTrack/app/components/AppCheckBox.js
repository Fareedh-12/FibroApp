import { StyleSheet } from "react-native";
import React from "react";
import { Checkbox } from "native-base";

const AppCheckBox = (props) => {
  return (
    <Checkbox
      colorScheme="green"
      value={props.value}
      onChange={props.onValueChange}
      defaultIsChecked
    >
      {props.text}
    </Checkbox>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({});
