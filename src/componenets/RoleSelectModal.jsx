import React from "react";

export default function RoleSelectionModal({ onStudentClick, onCitizenClick }) {
  return (
    <div className="text-center flex flex-col justify-center bg-gradient-to-br from-green-900 via-gray-900 to-green-300 text-gray-50 px-6 py-4 gap-4">
      <h2 className="text-xl sm:text-2xl font-bold">Select Your Role</h2>
      <div className="flex flex-col gap-2">
        <button onClick={onStudentClick} className="btn-primary ">
          I’m a Student
        </button>
        <button onClick={onCitizenClick} className="btn-primary">
          I’m Not a Student
        </button>
      </div>
    </div>
  );
}
