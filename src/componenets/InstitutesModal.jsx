import React, { useEffect, useState } from "react";

function InstitutesModal() {
  //    const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [states, setStates] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [whatsAppUrl, setWhatsAppLUrl] = useState("");

  useEffect(() => {
    if (modalOpen) fetchStates();
  }, [modalOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsAppLink: "",
    state: "",
    town: "",
    school: "",
    password: "",
    confirmPassword: "",
  });

  const fetchStates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://nga-states-lga.onrender.com/fetch");
      const data = await res.json();

      setStates(data);
    } catch (error) {
      "Failed to load state", error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInstitutionsByState = async (stateName) => {
    const res = await fetch("/states.json");
    const data = await res.json();
    const result = data.find(
      (inst) => inst.state.toLowerCase() === stateName.toLowerCase()
    );
    setInstitutions(result?.schools || []);
  };

  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    fetchInstitutionsByState(stateName);
    setModalOpen(true);
    setFormData({ ...formData, state: stateName });
  };

  const handleInstitutionClick = (school) => {
    setFormData({ ...formData, school });
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-400 via-gray-100 to-gray-300  bg-opacity-30 z-50">
          <div className="bg-gray-200 w-full max-w-lg p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto relative">
            {/* <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-xl text-gray-500">
              &times;
            </button> */}

            {!selectedState ? (
              <>
                <h2 className="text-lg font-bold mb-2">Choose State</h2>
                {isLoading ? (
                  <div className="text-gray-800 italic">States Loading...</div>
                ) : (
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
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-2">
                  Select Institution in {selectedState}
                </h2>
                {institutions.map((inst, i) => (
                  <div
                    key={i}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm rounded-sm"
                    onClick={() => handleInstitutionClick(inst)}>
                    {inst}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InstitutesModal;
