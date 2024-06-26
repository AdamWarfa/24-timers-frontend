import { Discipline } from "../types/types";

export default function DisciplineList({ disciplines }: { disciplines: Discipline[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Disciplines List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Result Type</th>
              <th className="py-2 px-4 border-b border-gray-200">Participants</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((discipline) => (
              <tr key={discipline.id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                <td className="py-2 px-4 border-b border-gray-200 text-center">{discipline.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{discipline.resultType}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{discipline.participants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
