// components/ParticipantList.tsx

import React, { useState } from "react";
import { Participant } from "../types/types";
import ParticipantDisciplinesModal from "./ParticipantDisciplinesModal";
import DisciplineModal from "./DisciplineModal";
import EditParticipantModal from "./EditParticipantModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { deleteParticipant } from "../api/rest";

interface ParticipantListProps {
  participants: Participant[];
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  const [isDisciplinesModalOpen, setIsDisciplinesModalOpen] = useState(false);
  const [isAddDisciplineModalOpen, setIsAddDisciplineModalOpen] = useState(false);
  const [isEditParticipantModalOpen, setIsEditParticipantModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const handleParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDisciplinesModalOpen(true);
  };

  const handleAddDisciplineClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsAddDisciplineModalOpen(true);
  };

  const handleEditParticipantClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsEditParticipantModalOpen(true);
  };

  const handleDeleteClick = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDisciplinesModalOpen(false);
    setIsAddDisciplineModalOpen(false);
    setIsEditParticipantModalOpen(false);
    setIsConfirmDeleteModalOpen(false);
    setSelectedParticipant(null);
  };

  const handleParticipantUpdate = (updatedParticipant: Participant) => {
    // Update participant logic here, possibly via an API call
    console.log("Updated Participant:", updatedParticipant);
    handleModalClose();
  };

  const handleConfirmDelete = () => {
    if (selectedParticipant) {
      deleteParticipant(selectedParticipant.id);
      handleModalClose();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Participants List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Club</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id} className="cursor-pointer hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{participant.fullName}</td>
                <td className="py-2 px-4 border-b text-center">{participant.gender}</td>
                <td className="py-2 px-4 border-b text-center">{participant.age}</td>
                <td className="py-2 px-4 border-b text-center">{participant.club}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleParticipantClick(participant)}>
                    View Disciplines
                  </button>
                  <button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAddDisciplineClick(participant)}>
                    Add Discipline
                  </button>
                  <button className="ml-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditParticipantClick(participant)}>
                    Edit
                  </button>
                  <button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteClick(participant)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedParticipant && (
        <>
          <ParticipantDisciplinesModal isOpen={isDisciplinesModalOpen} onClose={handleModalClose} participant={selectedParticipant} />
          <DisciplineModal isOpen={isAddDisciplineModalOpen} onClose={handleModalClose} participant={selectedParticipant} />
          <EditParticipantModal isOpen={isEditParticipantModalOpen} onClose={handleModalClose} participant={selectedParticipant} onSubmit={handleParticipantUpdate} />
          <ConfirmDeleteModal isOpen={isConfirmDeleteModalOpen} onClose={handleModalClose} onConfirm={handleConfirmDelete} participantName={selectedParticipant.fullName} />
        </>
      )}
    </div>
  );
};

export default ParticipantList;
