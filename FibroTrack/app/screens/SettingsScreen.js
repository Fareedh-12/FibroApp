import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import AuthContext from "../auth/context";
import { signOutUser } from "../api/auth";
import featureComingSoon from "../components/FeatureComingSoon";

// Assuming you have a function to handle sign out

const SettingsScreen = () => {
  const { user, setUser } = useContext(AuthContext);

  // Access user data, fallback to defaults if not available
  // Use user data if available, otherwise fallback to defaults
  const username = user.displayName || "User";
  const userImage = user.photoURL || "https://i.imgur.com/6Iw3v3R.jpg";
  const email = user.email || "No email available";

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (result.ok) {
      setUser(null); // Update context/state to reflect the user has signed out
    } else {
      // Handle sign out errors
      Alert.alert("Sign Out Failed", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => featureComingSoon("Update Profile ")}>
          <Image source={{ uri: userImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.text}>{username}</Text>
        <Text style={styles.text}>{email}</Text>
      </View>

      <View style={styles.settingsOptions}>
        <TouchableOpacity
          onPress={() => featureComingSoon("Notification Preferences")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Notification Preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => featureComingSoon("Change Password")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => featureComingSoon("Privacy settings")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={styles.option}>
          <Text style={styles.optionText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  settingsOptions: {
    width: "100%", // Take the full container width
  },
  option: {
    backgroundColor: "#f0f0f0", // Light grey background for options
    padding: 15,
    borderRadius: 5,
    marginBottom: 10, // Space between options
  },
  optionText: {
    fontSize: 18,
  },
});
