// Import the required functions from Firebase SDK
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
export const signUp = async ({ email, password, username }) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Update the user's profile with the username
    await updateProfile(user, {
      displayName: username,
    });

    // Save the user's profile in Firestore
    // await setDoc(doc(db, "users", user.uid), {
    //   username,
    //   email,
    // });
    console.log("User created:");
    return user;
  } catch (error) {
    throw error; // Rethrow the error to be handled where the function is called
  }
};
