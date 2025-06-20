import React, { useEffect, useState } from "react";

export default function StateModal({ onSelectState, onClose }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await fetch("https://nga-states-lga.onrender.com/fetch");
      const data = await res.json();
      setStates(data);
    };

    fetchStates();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500">
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Choose State</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {states.map((state, i) => (
            <div
              key={i}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => onSelectState(state)}>
              {state}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
