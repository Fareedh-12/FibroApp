import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import AuthContext from "../auth/context";

const slides = [
  {
    key: "one",
    title: "Welcome to FibroTrack",
    text: "Empowering you to manage and track your fibromyalgia symptoms every day.",
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Track Your Symptoms",
    text: "Easily log your daily symptoms, triggers, and mood to identify patterns over time.",
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Manage Your Journey",
    text: "Get insights into your health trends and share reports with your healthcare provider for better care.",
    backgroundColor: "#22bcb5",
  },
];

const GettingStartedScreen = ({ navigation }) => {
  authContext = useContext(AuthContext);
  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Image source={item.image} /> */}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    authContext.setIsFirstTimeUser(false);
  };

  return (
    <AppIntroSlider renderItem={renderSlide} data={slides} onDone={onDone} />
  );
};

export default GettingStartedScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginVertical: 8,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
