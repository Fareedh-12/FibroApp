import { StyleSheet } from "react-native";
import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";

const AppSubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <>
      {/* come back and fix this, submit should first validate */}
      <AppButton text={title} type="primary" onPress={handleSubmit} />
    </>
  );
};

export default AppSubmitButton;

const styles = StyleSheet.create({});
