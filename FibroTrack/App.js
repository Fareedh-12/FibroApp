import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import SelectedDateContext from "./app/date/context";
import AuthContext from "./app/auth/context";

import Screen from "./app/components/Screen";
import GettingStartedScreen from "./app/screens/GettingStartedScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false); // New state variable

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        // Optionally, check if it's the user's first time and update state accordingly
      } else {
        setUser(null);
      }
      setIsAuthCheckComplete(true); // Indicate that the auth check is complete
    });

    return unsubscribe; // Unsubscribe on component unmount
  }, []);

  useEffect(() => {
    // Hide the splash screen only after the auth check is complete
    if (isAuthCheckComplete) {
      SplashScreen.hideAsync();
    }
  }, [isAuthCheckComplete]); // This effect depends on the isAuthCheckComplete state

  return (
    <AuthContext.Provider
      value={{ user, setUser, isFirstTimeUser, setIsFirstTimeUser }}
    >
      <NavigationContainer theme={navigationTheme}>
        <Screen>
          {user ? (
            isFirstTimeUser ? (
              <GettingStartedScreen />
            ) : (
              <SelectedDateContext.Provider
                value={{ selectedDate, setSelectedDate }}
              >
                <AppNavigator />
              </SelectedDateContext.Provider>
            )
          ) : (
            <AuthNavigator />
          )}
        </Screen>
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
