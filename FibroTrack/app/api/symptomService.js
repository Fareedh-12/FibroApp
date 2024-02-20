import { db } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  getDoc,
} from "firebase/firestore";

const initializeUserSymptoms = async (userId) => {
  const initialSymptoms = [
    { name: "Pain", visible: true },
    { name: "Fatigue", visible: true },
    { name: "Mood", visible: true },
    { name: "Brain Fog", visible: true },
    { name: "Sleep", visible: true },
    { name: "Physical Activity", visible: true },
  ];

  try {
    // Correctly create a batch operation
    const batch = writeBatch(db);

    initialSymptoms.forEach((symptom) => {
      // For each symptom, create a reference to the document in the user's symptoms subcollection
      const symptomRef = doc(
        collection(db, `users/${userId}/symptoms`),
        symptom.name
      );
      // Use the batch to set the document with the symptom data
      batch.set(symptomRef, symptom);
    });

    // Commit the batch operation
    await batch.commit();
    console.log("Default symptoms initialized for user:", userId);
  } catch (error) {
    console.error("Error initializing symptoms for user:", userId, error);
  }
};

// Function to fetch symptoms for a specific user
const fetchUserSymptoms = async (userId) => {
  try {
    const symptomsSnapshot = await getDocs(
      collection(db, `users/${userId}/symptoms`)
    );
    const symptoms = [];
    symptomsSnapshot.forEach((doc) => {
      let symptom = doc.data();
      symptom.id = doc.id; // Optionally add the document ID to the symptom object
      symptoms.push(symptom);
    });
    return symptoms; // Returns an array of symptom objects
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    throw new Error("Failed to fetch symptoms.");
  }
};

// Function to fetch the symptom intensity for a specific day
const fetchSymptomIntensityForDay = async (userId, symptomName, date) => {
  const dateStr = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  const docRef = doc(
    db,
    `users/${userId}/symptoms/${symptomName}/entries`,
    dateStr
  );

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().intensity !== undefined) {
      return docSnap.data().intensity;
    } else {
      return 0; // Default to 0 if not found
    }
  } catch (error) {
    console.error("Error fetching symptom intensity:", error);
    return 0; // Default to 0 in case of error
  }
};

const saveSymptomData = async (userId, symptom, value, date) => {
  const dateStr = date.toISOString().split("T")[0];
  const symptomData = {
    [symptom]: value,
    date: dateStr,
    updatedAt: new Date(),
  };

  try {
    await setDoc(doc(db, `users/${userId}/symptoms`, dateStr), symptomData, {
      merge: true,
    });
    console.log("Symptom data saved successfully.");
  } catch (error) {
    console.error("Error saving symptom data:", error);
    throw new Error("Failed to save symptom data.");
  }
};

const updateOrCreateSymptomData = async (userId, symptom, intensity, date) => {
  const dateStr = date.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  // Adjust the path to point to the entries subcollection for a given symptom
  const entryRef = doc(
    db,
    `users/${userId}/symptoms/${symptom}/entries`,
    dateStr
  );

  try {
    const entryData = {
      day: dateStr,
      intensity: intensity,
      updatedAt: new Date(),
    };
    // Since each day should have a unique entry, you can directly set the document
    await setDoc(entryRef, entryData, { merge: true });
    console.log("Symptom entry updated/created successfully.");
  } catch (error) {
    console.error("Error updating symptom entry:", error);
    throw new Error("Failed to update symptom entry.");
  }
};

export {
  saveSymptomData,
  initializeUserSymptoms,
  fetchUserSymptoms,
  fetchSymptomIntensityForDay,
  updateOrCreateSymptomData,
};
