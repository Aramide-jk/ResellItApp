import React, { useEffect, useState } from "react";

export default function SchoolModal({
  selectedState,
  onSelectSchool,
  onClose,
}) {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchInstitutionsByState = async () => {
      const res = await fetch("/states.json");
      const data = await res.json();
      const result = data.find(
        (item) => item.state.toLowerCase() === selectedState.toLowerCase()
      );
      setSchools(result?.schools || []);
    };

    if (selectedState) {
      fetchInstitutionsByState();
    }
  }, [selectedState]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500">
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">
          Select Institution in {selectedState}
        </h2>
        {schools.map((school, i) => (
          <div
            key={i}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => onSelectSchool(school)}>
            {school}
          </div>
        ))}
      </div>
    </div>
  );
}
