// src/components/CreateResultModal.tsx
import React, { useState } from "react";
import { Participant, Discipline, Result } from "../types/types";

interface CreateResultModalProps {
  isOpen: boolean;
  closeModal: () => void;
  participants: Participant[];
  disciplines: Discipline[];
  onSubmit: (formData: Omit<Result, "id">) => void;
}

const CreateResultModal: React.FC<CreateResultModalProps> = ({ isOpen, closeModal, participants, disciplines, onSubmit }) => {
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [resultType, setResultType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [resultValue, setResultValue] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      resultType,
      date,
      resultValue,
      participantId: selectedParticipant,
      disciplineId: selectedDiscipline,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Create Result</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Participant</label>
            <select
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a participant</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Discipline</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a discipline</option>
              {disciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Result Type</label>
            <input
              type="text"
              value={resultType}
              onChange={(e) => setResultType(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Result Value</label>
            <input
              type="number"
              value={resultValue}
              onChange={(e) => setResultValue(parseFloat(e.target.value))}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResultModal;
