import React, { useState } from "react";
import SymptomGraph from "./SymptomGraph";
import AppDropDown from "./AppDropDown";
import { ScrollView } from "@gluestack-ui/themed";

const SymptomGraphs = ({ data }) => {
  const [selectedSymptom, setSelectedSymptom] = useState(Object.keys(data)[0]);

  return (
    <ScrollView>
      <SymptomGraph
        data={{ [selectedSymptom]: data[selectedSymptom] }}
        symptom={selectedSymptom}
      />
      <AppDropDown
        options={Object.keys(data)}
        onSelect={(selected) => setSelectedSymptom(selected)}
      />
    </ScrollView>
  );
};

export default SymptomGraphs;
