import React from "react";

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="lg:max-w-[900px] max-h-[800px] mx-5 flex justify-between flex-col     ">
        <button
          className="place-self-end text-white text-xl font-bold"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white rounded">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
