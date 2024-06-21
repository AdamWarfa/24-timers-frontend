import { Participant, Discipline, Result } from "../types/types";

export default function DisciplineList({ disciplines }: { disciplines: Discipline[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Disciplines List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Result Type</th>
              <th className="py-2 px-4 border-b">Participants</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((discipline) => (
              <tr key={discipline.id}>
                <td className="py-2 px-4 border-b text-center">{discipline.name}</td>
                <td className="py-2 px-4 border-b text-center">{discipline.resultType}</td>
                <td className="py-2 px-4 border-b text-center">{discipline.participants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
