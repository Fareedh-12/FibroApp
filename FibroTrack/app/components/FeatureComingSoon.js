import { Alert } from "react-native";

const featureComingSoon = (featureName) => {
  Alert.alert(
    `${featureName} Coming Soon`,
    "This feature is not available yet, but we're working to bring it to you soon!",
    [{ text: "OK" }]
  );
};

export default featureComingSoon;
