import React from "react";
const DeclinedModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <div className={`modal-container ${open ? "open" : ""}`}>
      <div onClick={handleClose} className="modal-backdrop"></div>
      <div className="modal">declined</div>
    </div>
  );
};

export default DeclinedModal;
