import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import * as Yup from "yup";

import AppHeading from "../components/AppHeading";
import AppButton from "../components/AppButton";
import AppCheckBox from "../components/AppCheckBox";
import {
  AppForm,
  AppFormField,
  AppSubmitButton,
  ErrorMessage,
} from "../components/forms";

import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../api/auth";
import AuthContext from "../auth/context";

validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (loginInfo) => {
    console.log(loginInfo);
    const { email, password } = loginInfo;
    const result = await signIn({ email, password });
    if (!result.ok) {
      setLoginFailed(true);
      console.error(result.error);
      return;
    }

    setLoginFailed(false);
    authContext.setUser(result.data);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <AppHeading size={20}>Login into your account</AppHeading>
      </View>

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <View style={styles.loginForm}>
          <ErrorMessage
            error="Invalid email or password."
            visible={loginFailed}
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

          <View style={styles.optionsContainer}>
            {/* <AppCheckBox text="Remember Me" /> */}

            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
        </View>

        <AppSubmitButton title="Sign In" />
      </AppForm>

      <View style={{ marginVertical: 30 }}>
        <Text style={{ color: colors.dark }}>Or Login with</Text>
      </View>
      <View style={styles.loginOptions}>
        <AppButton text="Google" width={155} borderColor={colors.light} />
        <AppButton text="Apple" width={155} borderColor={colors.light} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  loginForm: {
    width: "100%",
    marginTop: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  forgotPassword: {
    color: colors.dark,

    marginRight: 15,
  },
  loginOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
