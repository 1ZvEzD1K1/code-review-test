import { CenteredLayout } from '~/components';
import QnAList from './components/QnAList/QnAList';
import { TQnA } from './components/QnA/QnA';

const QnA: TQnA[] = [
  { question: 'Do you run like a fish?' },
  { answer: 'Absolutely man' },
  { question: 'Have you tried to swim like a dinosaur?' },
  { answer: 'Nah, not my cup of tea' },
  { question: 'How are we counting from 5 to 10?' },
  { answer: 'Do I look like a counter?' },
];

export const Refactor2 = () => {
  return (
    <CenteredLayout className="gap-2">
      <div className="text-3xl mb-2">See the code</div>
      <QnAList data={QnA} />
    </CenteredLayout>
  );
};
