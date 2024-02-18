import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyFibroTrackScreen from "../screens/DailyFibroTrackScreen";
import MyFibroChartScreen from "../screens/MyFibroChartScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { AntDesign, Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: { paddingTop: 15, height: 60 },
      }}
    >
      <Tab.Screen
        name="Daily Fibro"
        component={DailyFibroTrackScreen}
        options={{
          tabBarLabel: "Daily Track",
          tabBarIcon: ({ color, size }) => (
            <Octicons name="log" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Fibro Charts"
        component={MyFibroChartScreen}
        options={{
          tabBarLabel: "My Charts",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
