import { CenteredLayout } from '~/layouts';
import { IQuestionOrAnswer, QnaRender } from '~/components/QnARender';

// TODO refactor
//* Done

const canIChangeInputData = true;

const QnA: IQuestionOrAnswer[] = [
  { question: 'Do you run like a fish?', id: 1 },
  { answer: 'Absolutely man', id: 2 },
  { question: 'Have you tried to swim like a dinosaur?', id: 3 },
  { answer: 'Nah, not my cup of tea', id: 4 },
  { question: 'How are we counting from 5 to 10?', id: 5 },
  { answer: 'Do I look like a counter?', id: 6 },
];


export const Refactor2 = () => {
  return (
    <CenteredLayout className='gap-2'>
      <div className='text-3xl mb-2'>See the code</div>
      {
        QnA.map((item) => (
          <QnaRender
            key={ canIChangeInputData ? item.id : JSON.stringify(item) }
            { ...item }
          />
        ))
      }
    </CenteredLayout>
  );
};
