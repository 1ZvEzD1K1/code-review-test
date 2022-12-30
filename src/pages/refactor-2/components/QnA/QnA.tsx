import React from 'react';
import Question, { IQuestion } from '../Question/Question';
import Answer, { IAnswer } from '../Answer/Answer';

export type TQnA = IQuestion | IAnswer;

const QnA = (props: TQnA) => {
  if ('question' in props) {
    return <Question {...props} />;
  } else if ('answer' in props) {
    <Answer {...props} />;
  }

  return null;
};

export default QnA;
