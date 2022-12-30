import { CenteredLayout } from '~/components';

type ITextType = 'question' | 'answer';

interface QuestionOrAnswer {
  children: React.ReactNode;
  type: ITextType;
}

interface ITextItem {
  text: string;
  type: ITextType;
}

const QnA: ITextItem[] = [
  { text: 'Do you run like a fish?', type: 'question' },
  { text: 'Absolutely man', type: 'answer' },
  { text: 'Have you tried to swim like a dinosaur?', type: 'question' },
  { text: 'Nah, not my cup of tea', type: 'answer' },
  { text: 'How are we counting from 5 to 10?', type: 'question' },
  { text: 'Do I look like a counter?', type: 'answer' },
];

const QnaRender = ({ type, children }: QuestionOrAnswer) => {
  if (type === 'question') {
    return <h3 className="font-bold text-lg">{children}</h3>;
  } else {
    return <p className="mb-2">{children}</p>;
  }
};

export const Refactor2 = () => {

  const renderItem = (item: ITextItem, index: number) => (
    <QnaRender key={index} type={item.type}>
      {item.text}
    </QnaRender>
  )

  return (
    <CenteredLayout className="gap-2">
      <div className="text-3xl mb-2">See the code</div>
      {QnA.map(renderItem)}
    </CenteredLayout>
  );
};
