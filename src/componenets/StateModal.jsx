import React, { useEffect, useState } from "react";

function StateModal() {
  //   const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsAppLink: "",
    town: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [modalOpen, setModalOpen] = useState(true);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modalOpen) fetchStates();
  }, [modalOpen]);
  const handleStateClick = (stateName) => {
    setSelectedState(stateName);
    fetchTownByState(stateName);
    setModalOpen(true);
    setFormData({ ...formData, state: stateName });
  };

  const fetchStates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://nga-states-lga.onrender.com/fetch");
      const data = await res.json();

      setStates(data);
    } catch (error) {
      console.log("Failed to fetch states", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTownByState = async (stateName) => {
    try {
      const res = await fetch("/stateWithTown.json");
      const data = await res.json();

      const match = data.find(
        (t) => t.state.toLowerCase() === stateName.toLowerCase()
      );

      setTowns(match?.town || []);
    } catch (error) {
      console.log("Filed to state", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstitutionClick = (town) => {
    setFormData({ ...formData, town });
    console.log(town);
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
                  <div className="text-gray-800 text-s italic">
                    State loading...
                  </div>
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
                  Select Town in {selectedState}
                </h2>
                {towns.map((town, i) => (
                  <div
                    key={i}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm rounded-sm"
                    onClick={() => handleInstitutionClick(town)}>
                    {town}
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

export default StateModal;
