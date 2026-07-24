const questionDifficulties =[
    'Easy',
    'Medium',
    'Hard'
] as const

type questionDifficulties = ( typeof questionDifficulties)[number]

export interface InterviewQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  answer: string;
}