import React from "react";

export default function RoleSelectionModal({ onStudentClick, onCitizenClick }) {
  return (
    <div className="modal">
      <h2>Select Your Role</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button onClick={onStudentClick}>I’m a Student</button>
        <button onClick={onCitizenClick}>I’m Not a Student</button>
      </div>
    </div>
  );
}
