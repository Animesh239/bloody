import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./config";
import { addDoc, collection, GeoPoint } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;
    return { success: true, user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { success: false, error: errorMessage };
  }
};

export const loginUser = async (email, password) => {
  const auth = getAuth();

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // You can return user data or success message
    return { success: true, user };
  } catch (error) {
    // Handle errors such as invalid email, weak password, etc.
    return { success: false, error: error.message };
  }
};

export const registerUser = async (userData) => {
  try {
    const usersRef = collection(db, "users");
    await addDoc(usersRef, {
      ...userData,
      location: new GeoPoint(
        userData.location.latitude, // Ensure these are set
        userData.location.longitude
      ),
    });
    console.log("User registered successfully!");
  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error("Error registering user");
  }
};

// Function to add hospital to Firestore
export const addHospitalToFirestore = async (hospitalData) => {
  try {
    const hospitalRef = collection(db, "hospitals");
    await addDoc(hospitalRef, {
      ...hospitalData,
      location: new GeoPoint(
        hospitalData.location.latitude,
        hospitalData.location.longitude
      ),
    });
    console.log("Hospital registered successfully!");
  } catch (error) {
    console.error("Error registering hospital: ", error);
    throw new Error("Error registering hospital");
  }
};

export const registerLab = async (labData) => {
  try {
    const labsCollection = collection(db, "labs");
    const docRef = await addDoc(labsCollection, labData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding lab: ", error);
    throw new Error("Failed to register lab");
  }
};
