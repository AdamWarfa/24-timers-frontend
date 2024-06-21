interface Participant {
  id: string;
  fullName: string;
  gender: string;
  age: number;
  club: string;
  disciplineIds: string[];
  resultIds: string[];
}

interface Discipline {
  id: string;
  name: string;
  resultType: string;
  participants: Participant[];
}

interface Result {
  id: string;
  resultType: string;
  date: string;
  participantId: string;
  disciplinId: string;
  result: string;
}

export type { Participant, Discipline, Result };
