import React from "react";
import { Participant } from "../types/types";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  participantName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, participantName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg z-50 relative">
        <button className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete participant {participantName}?</p>
        <div className="flex justify-between">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>
            Delete
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
