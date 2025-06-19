// StatesModal.jsx
import React, { useState, useEffect } from "react";

function StatesModal({ onSelect }) {
  const [states, setStates] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((res) => res.json())
      .then(setStates)
      .catch((err) => console.error("Failed to fetch states:", err));
  }, []);

  const fetchInstitutionsByState = async (stateName) => {
    const res = await fetch("/institutions.json");
    const data = await res.json();
    const filtered = data.filter(
      (inst) => inst.state.toLowerCase() === stateName.toLowerCase()
    );
    setInstitutions(filtered);
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    fetchInstitutionsByState(stateName);
  };

  const handleInstitutionClick = (university) => {
    onSelect({ state: selectedState, university });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 via-gray-100 to-gray-300  bg-opacity-30 z-50">
      <div className="bg-gray-200 w-full max-w-lg p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto relative">
        {!selectedState ? (
          <>
            <h2 className="text-lg font-bold mb-2">Choose State</h2>
            <div className="grid grid-cols-2 gap-2 text-sm -400">
              {states.map((state, i) => (
                <div
                  key={i}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-sm rounded-sm"
                  onClick={() => handleStateClick(state)}>
                  {state}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-2">
              Select University in {selectedState}
            </h2>
            {institutions.map((inst, i) => (
              <div
                key={i}
                className="p-2 cursor-pointer hover:bg-gray-100 text-sm rounded-sm"
                onClick={() => handleInstitutionClick(inst.name)}>
                {inst.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default StatesModal;
