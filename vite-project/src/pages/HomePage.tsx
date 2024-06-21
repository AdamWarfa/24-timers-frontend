// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import { getDisciplines, getParticipants, getResults, createParticipant, createResult } from "../api/rest";
import { Participant, Discipline, Result } from "../types/types";
import ParticipantList from "../components/ParticipantList";
import DisciplineList from "../components/DisciplineList";
import CreateParticipantModal from "../components/CreateParticipantModal"; // Adjust path as per your project structure
import CreateResultModal from "../components/CreateResultModal"; // Adjust path as per your project structure

const HomePage: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  useEffect(() => {
    getParticipants().then((data) => {
      setParticipants(data);
    });
    getDisciplines().then((data) => {
      setDisciplines(data);
    });
    getResults().then((data) => {
      setResults(data);
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

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  const handleCreateResult = (formData: Omit<Result, "id">) => {
    createResult(formData).then(() => {
      getResults().then((data) => {
        setResults(data);
      });
    });
    closeResultModal();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openParticipantModal}>
          Opret Deltager
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={openResultModal}>
          Create Result
        </button>
      </div>

      <ParticipantList participants={participants} />
      <DisciplineList disciplines={disciplines} />

      <CreateParticipantModal isOpen={isParticipantModalOpen} closeModal={closeParticipantModal} onSubmit={handleCreateParticipant} />
      <CreateResultModal isOpen={isResultModalOpen} closeModal={closeResultModal} onSubmit={handleCreateResult} participants={participants} disciplines={disciplines} />
    </div>
  );
};

export default HomePage;
