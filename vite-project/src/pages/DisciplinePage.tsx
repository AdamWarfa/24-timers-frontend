// src/pages/DisciplinePage.tsx
import React, { useState, useEffect } from "react";
import { getDisciplines } from "../api/rest";
import { Discipline } from "../types/types";
import DisciplineList from "../components/DisciplineList";

const DisciplinePage: React.FC = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    getDisciplines().then((data) => {
      setDisciplines(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Disciplines</h1>
      <DisciplineList disciplines={disciplines} />
    </div>
  );
};

export default DisciplinePage;
