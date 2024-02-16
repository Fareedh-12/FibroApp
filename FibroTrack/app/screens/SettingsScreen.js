import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";

// Assuming you have a function to handle sign out
// import { signOut } from '../api/auth';

const SettingsScreen = () => {
  // const { user } = useAuth(); // Access user data from context

  // Access user data, fallback to defaults if not available
  const username = "Username";
  const userImage = "https://via.placeholder.com/150";

  const handleSignOut = () => {
    // Your sign-out logic here
    Alert.alert("Sign Out", "User signed out successfully.");
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.profileContainer}>
        <Image source={{ uri: userImage }} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.settingsOptions}>
        <TouchableOpacity onPress={() => {}} style={styles.option}>
          <Text style={styles.optionText}>Notification Preferences</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.option}>
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
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    marginBottom: 20, // Space between username and settings options
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
