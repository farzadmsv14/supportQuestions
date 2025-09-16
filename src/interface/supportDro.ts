interface Question {
  id: number;
  question: string;
  description: string;
  answer?: string;
}

interface Questions {
  pageId: number;
  title: string;
  description: string;
  questions: Question[];
}
