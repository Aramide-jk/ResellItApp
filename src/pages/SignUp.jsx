import React, { useState } from "react";
import StudentSignUp from "./StudentsSignUpForm";
import RoleSelectionModal from "../componenets/RoleSelectModal";
import CitizenSignUp from "./CitizenSignUpForm";

function SignUp() {
  const [step, setStep] = useState("selectRole");

  return (
    <>
      {step === "selectRole" && (
        <RoleSelectionModal
          onStudentClick={() => setStep("studentModal")}
          onCitizenClick={() => setStep("citizenModal")}
        />
      )}

      {step === "studentModal" && (
        <StudentSignUp onStudentClick={() => setStep("studentModal")} />
      )}

      {step === "citizenModal" && (
        <CitizenSignUp onCitizenClick={() => setStep("citizenModal")} />
      )}
    </>
  );
}

export default SignUp;
