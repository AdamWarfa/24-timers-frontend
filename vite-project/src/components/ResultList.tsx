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
      <h1 className="text-2xl font-bold mb-4">Results List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Result Type</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Participant</th>
              <th className="py-2 px-4 border-b">Discipline</th>
              <th className="py-2 px-4 border-b">Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td className="py-2 px-4 border-b text-center">{result.resultType}</td>
                <td className="py-2 px-4 border-b text-center">{result.date}</td>
                <td className="py-2 px-4 border-b text-center">{findParticipantFullName(result.participantId)}</td>
                <td className="py-2 px-4 border-b text-center">{findDisciplineName(result.disciplineId)}</td>
                <td className="py-2 px-4 border-b text-center">{result.resultValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultList;
