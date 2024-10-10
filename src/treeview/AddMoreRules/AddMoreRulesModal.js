import React, { createContext, useContext } from "react";
import Modal from "react-modal";
import { AppContext } from "../../App";
export default function AddMoreRulesModal({ isOpen, setModalOpen }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            height: 120,
        },
    };
    const { dataQualityStates, setDataQualityStates } = useContext(AppContext);
    const { draggableColumnName, droppableColumnName } = dataQualityStates;
    return (
        <div>
            <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
                Adding {draggableColumnName} to {droppableColumnName}
                <button>Confirm</button>
                <button onClick={() => setModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
}
