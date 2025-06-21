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
        <StudentSignUp
          accountType="student"
          onBack={() => setStep("selectRole")}
        />
      )}

      {step === "citizenModal" && (
        <CitizenSignUp
          accountType="citizen"
          onBack={() => setStep("selectRole")}
        />
      )}
    </>
  );
}

export default SignUp;

// import React, { useState } from "react";
// import StudentSignUp from "./StudentsSignUpForm";
// import RoleSelectionModal from "../componenets/RoleSelectModal";
// import CitizenSignUp from "./CitizenSignUpForm";

// function SignUp() {
//   const [step, setStep] = useState("selectRole");

//   return (
//     <>
//       {step === "selectRole" && (
//         <RoleSelectionModal
//           onStudentClick={() => setStep("studentModal")}
//           onCitizenClick={() => setStep("citizenModal")}
//         />
//       )}

//       {step === "studentModal" && (
//         <StudentSignUp onStudentClick={() => setStep("studentModal")} />
//       )}

//       {step === "citizenModal" && (
//         <CitizenSignUp onCitizenClick={() => setStep("citizenModal")} />
//       )}
//     </>
//   );
// }

// export default SignUp;
