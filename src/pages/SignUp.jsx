// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BiShoppingBag, BiUserPlus } from "react-icons/bi";
// import StatesModal from "../StateModal";

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     university: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(true); // initially true

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Your form submit logic...
//   };

//   const handleSelect = ({ state, university }) => {
//     setFormData((prev) => ({
//       ...prev,
//       university,
//     }));
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
//       {showModal ? (
//         <StatesModal onSelect={handleSelect} />
//       ) : (
//         <>
//           <div className="sm:mx-auto sm:w-full sm:max-w-md">
//             <div className="flex justify-center">
//               <BiShoppingBag className="h-12 w-12 text-green-600" />
//             </div>
//             <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//               Join ResellIt Community
//             </h2>
//             <p className="mt-2 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-green-600 hover:text-green-500">
//                 Sign in here
//               </Link>
//             </p>
//           </div>

//           <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//             <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 {error && (
//                   <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
//                     {error}
//                   </div>
//                 )}

//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="mt-1 input-field"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     required
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="mt-1 input-field"
//                     placeholder="(555) 123-4567"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="university"
//                     className="block text-sm font-medium text-gray-700">
//                     University
//                   </label>
//                   <input
//                     id="university"
//                     name="university"
//                     type="text"
//                     required
//                     readOnly
//                     value={formData.university}
//                     className="mt-1 input-field bg-gray-100 cursor-not-allowed"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="mt-1 input-field"
//                     placeholder="At least 6 characters"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="mt-1 input-field"
//                   />
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full flex justify-center items-center space-x-2 btn-primary">
//                     <BiUserPlus className="h-4 w-4" />
//                     <span>
//                       {isLoading ? "Creating account..." : "Create account"}
//                     </span>
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-6 text-xs text-gray-500 text-center">
//                 By signing up, you agree to connect with fellow students in your
//                 university community to buy and sell items responsibly.
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

/////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BiShoppingBag, BiUserPlus } from "react-icons/bi";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsAppLink: "",
    university: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [states, setStates] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (modalOpen) fetchStates();
  }, [modalOpen]);

  const fetchStates = async () => {
    const res = await fetch("https://nga-states-lga.onrender.com/fetch");
    const data = await res.json();
    setStates(data);
  };

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
    setFormData({ ...formData, university });
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    const success = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsAppLink: formData.whatsAppLink,
      university: formData.university,
      password: formData.password,
    });

    if (success) {
      navigate("/");
    } else {
      setError("An account with this email already exists");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 via-gray-100 to-gray-300  bg-opacity-30 z-50">
          <div className="bg-gray-200 w-full max-w-lg p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-500">
              &times;
            </button>

            {!selectedState ? (
              <>
                <h2 className="text-lg font-bold mb-2">Choose State</h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
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
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BiShoppingBag className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Join ResellIt Community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 input-field"
                placeholder="kuruki James Ruka"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Gmail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 input-field"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 input-field"
                placeholder="+234 123 456 7890"
              />
            </div>
            <div>
              <label
                htmlFor="whatsAppLink"
                className="block text-sm font-medium text-gray-700">
                WhatsApp Link
              </label>
              <input
                id="whatsAppLink"
                name="whatsAppLink"
                type="url"
                // required
                value={formData.whatsAppLink}
                onChange={handleChange}
                className="mt-1 input-field"
                placeholder="Optional"
              />
            </div>

            <div>
              <label
                htmlFor="university"
                className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                id="university"
                name="university"
                type="text"
                required
                readOnly
                value={formData.university}
                className="mt-1 input-field bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 input-field"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center space-x-2 btn-primary">
                <BiUserPlus className="h-4 w-4" />
                <span>
                  {isLoading ? "Creating account..." : "Create account"}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-xs text-gray-500 text-center">
              By signing up, you agree to connect with fellow students in your
              university community to buy and sell items responsibly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { BiShoppingBag, BiUserPlus } from "react-icons/bi";

// function SignUp() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     university: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       setIsLoading(false);
//       return;
//     }

//     const success = await signup({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       university: formData.university,
//       password: formData.password,
//     });

//     if (success) {
//       navigate("/");
//     } else {
//       setError("An account with this email already exists");
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <BiShoppingBag className="h-12 w-12 text-green-600" />
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Join ResellIt Community
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-medium text-blue-600 hover:text-blue-500">
//             Sign in here
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700">
//                 University Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//                 placeholder="your.email@university.edu"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//                 placeholder="(555) 123-4567"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="university"
//                 className="block text-sm font-medium text-gray-700">
//                 University
//               </label>
//               <input
//                 id="university"
//                 name="university"
//                 type="text"
//                 required
//                 value={formData.university}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//                 placeholder="University of Example"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//                 placeholder="At least 6 characters"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="mt-1 input-field"
//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full flex justify-center items-center space-x-2 btn-primary">
//                 <BiUserPlus className="h-4 w-4" />
//                 <span>
//                   {isLoading ? "Creating account..." : "Create account"}
//                 </span>
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="text-xs text-gray-500 text-center">
//               By signing up, you agree to connect with fellow students in your
//               university community to buy and sell items responsibly.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default SignUp;

// /////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function SignUp() {
//   const [modalStep, setModalStep] = useState("state"); // "state" or "uni"
//   const [states, setStates] = useState([]);
//   const [universities, setUniversities] = useState([]);
//   const [selectedState, setSelectedState] = useState("");
//   const [formData, setFormData] = useState({
//     /* name, email, phone, university, password... */
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch states on mount
//     fetch("https://nga-states-lga.onrender.com/fetch")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) setStates(data);
//       });
//   }, []);

//   const selectState = (state) => {
//     setSelectedState(state);
//     setModalStep("uni");
//     fetch(
//       `https://nigeria-states-towns-lgas.onrender.com/api/${state}/universities`
//     )
//       .then((res) => res.json())
//       .then((data) => setUniversities(data));
//   };

//   const selectUniversity = (uni) => {
//     setFormData({ ...formData, university: uni.name || uni });
//     setModalStep(null); // close modal
//   };

//   return (
//     <>
//       {modalStep && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             {modalStep === "state" ? (
//               <>
//                 <h3>Select State</h3>
//                 <ul className="max-h-64 overflow-y-auto">
//                   {states.map((s, i) => (
//                     <li
//                       key={i || s}
//                       onClick={() => selectState(s.state_name || s)}
//                       className="cursor-pointer p-2 hover:bg-gray-200">
//                       {s || s.state}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             ) : (
//               <>
//                 <h3>Select University in {selectedState}</h3>
//                 <ul className="max-h-64 overflow-y-auto">
//                   {universities.map((u, i) => (
//                     <li
//                       key={i}
//                       onClick={() => selectUniversity(u)}
//                       className="cursor-pointer p-2 hover:bg-gray-200">
//                       {u.name}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Rest of signup form here, now with formData.university set */}
//     </>
//   );
// }

// export default SignUp;
