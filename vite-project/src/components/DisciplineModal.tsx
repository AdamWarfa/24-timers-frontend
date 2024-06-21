import React, { useState, useEffect } from "react";
import { Participant } from "../types/types";
import { getDisciplines, addDiscipline } from "../api/rest";

interface Discipline {
  id: string;
  name: string;
}

interface DisciplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: Participant;
}

const DisciplineModal: React.FC<DisciplineModalProps> = ({ isOpen, onClose, participant }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    if (isOpen) {
      getDisciplines().then((data) => {
        setDisciplines(data);
      });
    }
  }, [isOpen]);

  const handleAddDiscipline = (disciplineId: string) => {
    addDiscipline(participant, disciplineId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-96 max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add Discipline</h2>
        <ul>
          {disciplines.map((discipline) => (
            <li key={discipline.id} className="mb-2">
              <button className="w-full text-left py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => handleAddDiscipline(discipline.id)}>
                {discipline.name}
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DisciplineModal;
