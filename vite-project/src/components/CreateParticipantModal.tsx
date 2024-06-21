// components/CreateParticipantModal.tsx

import React from "react";
import { Discipline, Participant } from "../types/types";

interface CreateParticipantModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (formData: Omit<Participant, "id" | "resultIds">) => void;
  disciplines: Discipline[];
}

const CreateParticipantModal: React.FC<CreateParticipantModalProps> = ({ isOpen, closeModal, onSubmit, disciplines }) => {
  const [formData, setFormData] = React.useState({
    fullName: "",
    gender: "",
    age: 0,
    club: "",
    disciplineIds: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "disciplineIds") {
      // Convert selected options to an array of selected values
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg z-50 relative">
        <button className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800" onClick={closeModal}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Create Participant</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter full name"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter age"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Club:
              <input
                type="text"
                name="club"
                value={formData.club}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter club"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Disciplines:
              <select
                name="disciplineIds"
                value={formData.disciplineIds}
                onChange={handleChange}
                multiple
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Participant
            </button>
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateParticipantModal;
