import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

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

    // Uncomment the following line if you want to save the user's profile in Firestore
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
