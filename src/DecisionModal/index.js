import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import "./index.css";

const DecisionModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      style={{
        overlay: { backgroundColor: "rgb(230, 230, 230, 0.4)" },
        content: { backgroundColor: "transparent", border: "none" },
      }}
    >
      <div className="Decision">
        <div className="Decision-box">
          <div className="Decision-row">
            Do you really want to delete this {props.item}?
          </div>
          <div className="Decision-row">
            <Button
              onClick={props.confirmDelete}
              className="Decision-button"
              variant="danger"
            >
              Delete
            </Button>
            <Button
              onClick={props.rejectDelete}
              className="Decision-button"
              variant="primary"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DecisionModal;
