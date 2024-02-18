import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "./app/components/Screen";
import DailyFibroTrackScreen from "./app/screens/DailyFibroTrackScreen";
import GettingStartedScreen from "./app/screens/GettingStartedScreen";
import LoginScreen from "./app/screens/LoginScreen";
import PainMap from "./app/components/PainMap";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NativeBaseProvider } from "native-base";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/context";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        <Screen>{user ? <AppNavigator /> : <AuthNavigator />}</Screen>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
