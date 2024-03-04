import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
