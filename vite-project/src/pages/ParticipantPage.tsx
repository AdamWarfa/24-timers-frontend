// src/pages/ParticipantPage.tsx
import React, { useState, useEffect } from "react";
import { getParticipants, createParticipant, getDisciplines } from "../api/rest";
import { Participant, Discipline } from "../types/types";
import ParticipantList from "../components/ParticipantList";
import CreateParticipantModal from "../components/CreateParticipantModal";

const ParticipantPage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);

  useEffect(() => {
    getParticipants().then((data) => {
      setParticipants(data);
    });
    getDisciplines().then((data) => {
      setDisciplines(data);
    });
  }, []);

  const openParticipantModal = () => {
    setIsParticipantModalOpen(true);
  };

  const closeParticipantModal = () => {
    setIsParticipantModalOpen(false);
  };

  const handleCreateParticipant = (formData: Omit<Participant, "id" | "resultIds">) => {
    createParticipant(formData).then(() => {
      getParticipants().then((data) => {
        setParticipants(data);
      });
    });
    closeParticipantModal();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Participants</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 shadow-sm transition duration-150 ease-in-out" onClick={openParticipantModal}>
        Create Participant
      </button>
      <ParticipantList participants={participants} />
      <CreateParticipantModal isOpen={isParticipantModalOpen} disciplines={disciplines} closeModal={closeParticipantModal} onSubmit={handleCreateParticipant} />
    </div>
  );
};

export default ParticipantPage;
