import React, { useState } from "react";
import { statesWithSchools } from "./nigeriaData";

export default function StudentLocationModal({ onClose, setState, setSchool }) {
  const [selectedState, setSelectedStateLocal] = useState("");
  const [schools, setSchools] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedStateLocal(state);
    setSchools(statesWithSchools[state] || []);
  };

  const handleSchoolSelect = (school) => {
    setState(selectedState);
    setSchool(school);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Select Your State</h2>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">-- Choose State --</option>
        {Object.keys(statesWithSchools).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {schools.length > 0 && (
        <>
          <h2>Select Your School</h2>
          <ul>
            {schools.map((school) => (
              <li key={school}>
                <button onClick={() => handleSchoolSelect(school)}>
                  {school}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
