import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import * as Yup from "yup";

import { signUp } from "../api/auth";
import AppHeading from "../components/AppHeading";
import { AppForm, AppFormField, AppSubmitButton } from "../components/forms";
import AuthContext from "../auth/context";
import FeatureComingSoon from "../components/FeatureComingSoon";

validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3).label("Username"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUpScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { username, email, password } = values;
      const user = await signUp({ email, password, username });

      // Handle successful signup (e.g., navigate to the next screen or show a success message)
      resetForm();
      authContext.setUser(user);
      authContext.setIsFirstTimeUser(true);
      if (user) navigation.navigate("GettingStarted");
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup errors (e.g., show an error message)
    }
  };
  const navigateToLogin = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <AppHeading size={35}>FibroTrack</AppHeading>
      <View style={{ marginTop: 30, width: "100%" }}>
        <AppHeading size={25}>Welcome</AppHeading>
        <AppHeading>Get started for free today</AppHeading>
        <Text style={{ marginVertical: 20 }}>Please provide your details</Text>
      </View>

      <AppForm
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="username"
          placeholder="Username"
          icon="account"
          autoCorrect={false}
        />

        <AppFormField
          name="email"
          autoCapitalize="none"
          placeholder="Email"
          icon="email"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          placeholder="Password"
          icon="lock"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
        />
        <AppFormField
          name="confirmPassword"
          placeholder="Confirm Password"
          icon="lock"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
        />

        <View style={styles.buttons}>
          <AppSubmitButton title="Sign Up" />
          <TouchableOpacity onPress={navigateToLogin}>
            <Text>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </AppForm>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
});
