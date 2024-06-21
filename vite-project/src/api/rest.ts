import { Participant, Result } from "../types/types";

const endpoint = "http://localhost:9090/api";

async function getParticipants() {
  const res = await fetch(`${endpoint}/participants`);
  return await res.json();
}

async function getParticipant(participantId: string) {
  const res = await fetch(`${endpoint}/participants/${participantId}`);
  return await res.json();
}

async function getDisciplines() {
  const res = await fetch(`${endpoint}/disciplines`);
  return await res.json();
}

async function getDiscipline(disciplineId: string) {
  const res = await fetch(`${endpoint}/disciplines/${disciplineId}`);
  return await res.json();
}

async function getResults() {
  const res = await fetch(`${endpoint}/results`);
  return await res.json();
}

async function createParticipant(participant: Partial<Participant>) {
  const res = await fetch(`${endpoint}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });
  return await res.json();
}

async function updateParticipant(participant: Participant) {
  const res = await fetch(`${endpoint}/participants/${participant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  });
  return await res.json();
}

async function addDiscipline(participant: Participant, disciplineId: string) {
  const participantToUpdate = { ...participant, disciplineIds: [disciplineId] };

  console.log(participantToUpdate);

  const res = await fetch(`${endpoint}/participants/${participant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantToUpdate),
  });
  return await res.json();
}

async function deleteParticipant(participantId: string) {
  await fetch(`${endpoint}/participants/${participantId}`, {
    method: "DELETE",
  });
  alert("Participant deleted successfully");
}

async function createResult(result: Result) {
  const res = await fetch(`${endpoint}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  console.log(result);

  return await res.json();
}

export { getParticipants, getDisciplines, getResults, addDiscipline, createParticipant, updateParticipant, deleteParticipant, createResult, getDiscipline, getParticipant };
