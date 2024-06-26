import React, { useState, useEffect } from "react";
import { getResults, createResult, getParticipants, getDisciplines } from "../api/rest";
import { Result, Participant, Discipline } from "../types/types";
import ResultList from "../components/ResultList";
import CreateResultModal from "../components/CreateResultModal";

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  useEffect(() => {
    getResults().then((data) => {
      setResults(data);
    });
    getParticipants().then((data) => {
      setParticipants(data);
    });
    getDisciplines().then((data) => {
      setDisciplines(data);
    });
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Results</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 shadow-sm transition duration-150 ease-in-out" onClick={openResultModal}>
        Create Result
      </button>
      <ResultList results={results} />
      <CreateResultModal isOpen={isResultModalOpen} closeModal={closeResultModal} onSubmit={handleCreateResult} participants={participants} disciplines={disciplines} />
    </div>
  );
};

export default ResultPage;
