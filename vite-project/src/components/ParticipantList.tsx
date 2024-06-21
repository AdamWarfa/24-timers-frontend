import React, { useState, useEffect } from "react";
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
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "gender" | "age" | "club">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isDisciplinesModalOpen, setIsDisciplinesModalOpen] = useState(false);
  const [isAddDisciplineModalOpen, setIsAddDisciplineModalOpen] = useState(false);
  const [isEditParticipantModalOpen, setIsEditParticipantModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    setFilteredParticipants(participants);
  }, [participants]);

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = participants.filter((participant) => participant.fullName.toLowerCase().includes(searchTerm));
    setFilteredParticipants(filtered);
  };

  const handleSort = (property: "name" | "gender" | "age" | "club") => {
    if (sortBy === property) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }

    const sortedParticipants = [...filteredParticipants].sort((a, b) => {
      const factor = sortOrder === "asc" ? 1 : -1;
      if (property === "name") {
        return factor * a.fullName.localeCompare(b.fullName);
      } else if (property === "gender") {
        return factor * a.gender.localeCompare(b.gender);
      } else if (property === "age") {
        return factor * (a.age - b.age);
      } else if (property === "club") {
        return factor * a.club.localeCompare(b.club);
      }
      return 0;
    });

    setFilteredParticipants(sortedParticipants);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Participants List</h1>
      <div className="flex items-center mb-4">
        <input type="text" className="border rounded px-2 py-1 mr-2" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
        <div>
          <span className="mr-2">Sort by:</span>
          <button className={`border rounded px-2 py-1 ${sortBy === "name" ? "bg-gray-300" : ""}`} onClick={() => handleSort("name")}>
            Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button className={`border rounded px-2 py-1 ml-2 ${sortBy === "gender" ? "bg-gray-300" : ""}`} onClick={() => handleSort("gender")}>
            Gender {sortBy === "gender" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button className={`border rounded px-2 py-1 ml-2 ${sortBy === "age" ? "bg-gray-300" : ""}`} onClick={() => handleSort("age")}>
            Age {sortBy === "age" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
          <button className={`border rounded px-2 py-1 ml-2 ${sortBy === "club" ? "bg-gray-300" : ""}`} onClick={() => handleSort("club")}>
            Club {sortBy === "club" && (sortOrder === "asc" ? "▲" : "▼")}
          </button>
        </div>
      </div>
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
            {filteredParticipants.map((participant) => (
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
