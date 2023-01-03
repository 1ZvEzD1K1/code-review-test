import { CenteredLayout } from '~/components';

// TODO refactor
// -------------------------------------
// DONE: 
// 1. renamed vars; 
// 2. change interface on certain; 
// 3. refactor var QnA; 
// 4. refactor FC Render; 

interface QuestionWithAnswer {
  question: string;
  answer: string;
};

const questionWithAnswer: QuestionWithAnswer[] = [
  { question: 'Do you run like a fish?' , answer: 'Absolutely man' },
  { question: 'Have you tried to swim like a dinosaur?' , answer: 'Nah, not my cup of tea' },
  { question: 'How are we counting from 5 to 10?' , answer: 'Do I look like a counter?' },
];

const QuestionWithAnswerRender: React.FC<QuestionWithAnswer> = ({ question, answer }) => {
  return (
    <>
      <h3 className="font-bold text-lg">{question}</h3>
      <p className="mb-2">{answer}</p>
    </>
  );
};

export const Refactor2 = () => {
  return (
    <CenteredLayout className="gap-2">
      <div className="text-3xl mb-2">See the code</div>
      {questionWithAnswer.map((item, index) => (
        <QuestionWithAnswerRender key={index} {...item} />
      ))}
    </CenteredLayout>
  );
};
