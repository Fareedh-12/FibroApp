import AsyncStorage from "@react-native-async-storage/async-storage";

const markGettingStartedComplete = async () => {
  await AsyncStorage.setItem("hasCompletedGettingStarted", "true");
  setIsFirstTimeUser(false); // Assuming you have access to setIsFirstTimeUser via context or props
};

export default markGettingStartedComplete;
