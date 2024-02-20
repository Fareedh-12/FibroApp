import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import SelectedDateContext from "./app/date/context";

import Screen from "./app/components/Screen";
import GettingStartedScreen from "./app/screens/GettingStartedScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import * as SplashScreen from "expo-splash-screen";
import Tryout from "./app/components/Tryout";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        // Optionally, check if it's the user's first time and update state accordingly
      } else {
        setUser(null);
      }
      // Once everything is ready, hide the splash screen
      console.log("Hiding splash screen");
      SplashScreen.hideAsync();
    });

    return unsubscribe; // Unsubscribe on component unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isFirstTimeUser, setIsFirstTimeUser }}
    >
      {/* <SelectedDateContext.Provider value={selectedDate}>
        <Tryout></Tryout>
      </SelectedDateContext.Provider> */}
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
