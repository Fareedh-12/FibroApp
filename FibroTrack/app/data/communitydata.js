const generateCommunityData = (symptoms, startDate, endDate) => {
  const communityData = {};
  const currentDate = new Date(startDate.getTime());

  // Initialize communityData structure with symptoms
  symptoms.forEach((symptom) => {
    communityData[symptom] = {};
  });

  // Fill in each day with random intensity for each symptom
  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    symptoms.forEach((symptom) => {
      // Generate a random intensity between 1 and 5
      const intensity = Math.floor(Math.random() * 5) + 1;
      communityData[symptom][formattedDate] = intensity;
    });
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return communityData;
};

export default generateCommunityData;
