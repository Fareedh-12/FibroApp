import { db } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  getDoc,
  query,
  where,
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

const updateOrCreatePainData = async (userId, selectedDate, painData) => {
  const dateStr = selectedDate.toISOString().split("T")[0];
  const docRef = doc(db, `users/${userId}/symptoms/Pain/entries`, dateStr);

  try {
    const docSnap = await getDoc(docRef);
    let newData = { date: dateStr, painMap: painData, updatedAt: new Date() };

    await setDoc(docRef, newData, { merge: true });
    console.log("Pain data updated/created successfully.");
  } catch (error) {
    console.error("Error updating pain data:", error);
    throw new Error("Failed to update pain data.");
  }
};

const fetchPainDataForDate = async (userId, date) => {
  const dateStr = date.toISOString().split("T")[0];
  const docRef = doc(db, `users/${userId}/symptoms/Pain/entries`, dateStr);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Return the data if the document exists
      return docSnap.data().painMap; // Ensure this matches the structure you're saving
    }
    return []; // Return an empty array if no data exists for the date
  } catch (error) {
    console.error("Error fetching pain data:", error);
    throw new Error("Failed to fetch pain data.");
  }
};

const fetchPainMapDataForMonth = async (userId, year, month) => {
  const entriesRef = collection(db, `users/${userId}/symptoms/Pain/entries`);

  try {
    const querySnapshot = await getDocs(entriesRef);
    let allEntries = [];
    querySnapshot.forEach((doc) => {
      allEntries.push({ id: doc.id, ...doc.data() });
    });

    // Filter entries by the specified month and year
    const filteredEntries = allEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === year && entryDate.getMonth() === month;
    });

    return filteredEntries;
  } catch (error) {
    console.error(
      "Error fetching pain data entries for the specified month:",
      error
    );
    throw new Error("Failed to fetch pain data.");
  }
};

const fetchSymptomsData = async (userId, year, month) => {
  let symptomData = {};
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const symptomsRef = collection(db, `users/${userId}/symptoms`);
  const symptomsSnapshot = await getDocs(symptomsRef);
  const symptoms = symptomsSnapshot.docs.map((doc) => doc.id);

  for (const symptom of symptoms) {
    const entriesRef = collection(
      db,
      `users/${userId}/symptoms/${symptom}/entries`
    );
    // Adjust query to fetch only entries within the specified month
    const q = query(
      entriesRef,
      where("day", ">=", startDate.toISOString().split("T")[0]),
      where("day", "<=", endDate.toISOString().split("T")[0])
    );
    const querySnapshot = await getDocs(q);

    symptomData[symptom] = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.day && data.intensity !== undefined) {
        symptomData[symptom][data.day] = data.intensity;
      }
    });

    if (Object.keys(symptomData[symptom]).length === 0) {
      symptomData[symptom] = {}; // Keeping as an empty object if no entries found
    }
  }

  return symptomData;
};

export {
  initializeUserSymptoms,
  fetchUserSymptoms,
  fetchSymptomIntensityForDay,
  updateOrCreateSymptomData,
  updateOrCreatePainData,
  fetchPainDataForDate,
  fetchPainMapDataForMonth,
  fetchSymptomsData,
};
