import { FC, memo } from 'react';
import { QuestionOrAnswer } from '~/types/QuestionOrAnswer';

type Props = {
  item: QuestionOrAnswer,
}

export const QnaRender: FC<Props> = memo(({ item }) => {
  const isQuestion = item.hasOwnProperty('question');

  if (isQuestion) {
    return <h3 className="font-bold text-lg">{item.question}</h3>;
  } else {
    return <p className="mb-2">{item.answer}</p>;
  }
});
