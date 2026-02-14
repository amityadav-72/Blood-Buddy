import React, { useState } from "react";

const ERaktkoshButton = ({ bloodGroup }) => {
  const [showModal, setShowModal] = useState(false);

  const handleRedirect = () => {
    window.open(
      "https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch",
      "_blank"
    );
    setShowModal(false);
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg mt-4 w-full md:w-auto font-semibold shadow-md"
      >
        🔴 Check Live Government Blood Stock
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Redirecting to eRaktKosh
            </h2>

            <p className="text-gray-700 mb-4">
              Please select the following on the government portal:
            </p>

            <div className="bg-gray-100 rounded-lg p-3 text-left text-sm mb-4">
              <p><strong>State:</strong> Maharashtra</p>
              <p><strong>District:</strong> Amravati</p>
              <p><strong>Blood Group:</strong> {bloodGroup || "Select required group"}</p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleRedirect}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Continue
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ERaktkoshButton;
