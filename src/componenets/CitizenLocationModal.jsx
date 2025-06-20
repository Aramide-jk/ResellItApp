import React, { useState } from "react";
import { statesWithTowns } from "./nigeriaData";

export default function CitizenLocationModal({ onClose, setState, setTown }) {
  const [selectedState, setSelectedStateLocal] = useState("");
  const [towns, setTowns] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedStateLocal(state);
    setTowns(statesWithTowns[state] || []);
  };

  const handleTownSelect = (town) => {
    setState(selectedState);
    setTown(town);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Select Your State</h2>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">-- Choose State --</option>
        {Object.keys(statesWithTowns).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {towns.length > 0 && (
        <>
          <h2>Select Your Town</h2>
          <ul>
            {towns.map((town) => (
              <li key={town}>
                <button onClick={() => handleTownSelect(town)}>{town}</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
