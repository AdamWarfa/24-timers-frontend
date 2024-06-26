import React, { useEffect, useState } from "react";
import { Result, Participant, Discipline } from "../types/types";
import { getDisciplines, getParticipants } from "../api/rest";

interface ResultListProps {
  results: Result[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    getDisciplines().then((data) => {
      setDisciplines(data);
    });
    getParticipants().then((data) => {
      setParticipants(data);
    });
  }, []);

  const findParticipantFullName = (participantId: string): string => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.fullName : "Participant Not Found";
  };

  const findDisciplineName = (disciplineId: string): string => {
    const discipline = disciplines.find((d) => d.id === disciplineId);
    return discipline ? discipline.name : "Discipline Not Found";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Results List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Result Type</th>
              <th className="py-2 px-4 border-b border-gray-200">Date</th>
              <th className="py-2 px-4 border-b border-gray-200">Participant</th>
              <th className="py-2 px-4 border-b border-gray-200">Discipline</th>
              <th className="py-2 px-4 border-b border-gray-200">Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="py-2 px-4 border-b border-gray-200 text-center">{result.resultType}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{result.date}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{findParticipantFullName(result.participantId)}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{findDisciplineName(result.disciplineId)}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{result.resultValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultList;
