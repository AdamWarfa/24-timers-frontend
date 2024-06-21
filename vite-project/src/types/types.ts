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
  disciplineId: string;
  resultValue: number;
}

export type { Participant, Discipline, Result };
