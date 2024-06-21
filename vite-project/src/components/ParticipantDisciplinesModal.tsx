import React, { useEffect, useState } from "react";
import { Participant, Discipline } from "../types/types";
import { getDisciplines } from "../api/rest";

interface ParticipantDisciplinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant;
}

const ParticipantDisciplinesModal: React.FC<ParticipantDisciplinesModalProps> = ({ isOpen, onClose, participant }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    if (isOpen) {
      getDisciplines().then((data) => {
        console.log(data);
        setDisciplines(data);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg z-50">
        <button className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Disciplines for {participant.fullName}</h2>
        <ul className="divide-y divide-gray-200">
          {participant.disciplineIds.map((disciplineId) => {
            const discipline = disciplines.find((discipline) => discipline.id === disciplineId);
            return (
              <li key={disciplineId} className="py-2 px-4">
                {discipline && <span>{discipline.name}</span>}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 text-right">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDisciplinesModal;
