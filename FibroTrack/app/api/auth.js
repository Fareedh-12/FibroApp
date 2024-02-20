import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { initializeUserSymptoms } from "./symptomService";

const signUp = async ({ email, password, username }) => {
  try {
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

    // Create a user document in Firestore with additional profile details
    await setDoc(doc(db, "users", user.uid), {
      email,
      displayName: username,
      createdAt: new Date(), // Store the account creation date
    });

    // Initialize default symptoms for the new user
    await initializeUserSymptoms(user.uid);

    console.log("User created and default symptoms initialized: ", user);
    return user;
  } catch (error) {
    console.error("Error in user signup: ", error);
    throw error; // Rethrow the error to be handled where the function is called
  }
};

const signIn = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { ok: true, data: userCredential.user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export { signUp, signIn, signOutUser };
