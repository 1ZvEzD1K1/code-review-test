import React from 'react';

export interface IQuestion {
  question: string;
}

const Question = ({ question }: IQuestion) => {
  return <h3 className="font-bold text-lg">{question}</h3>;
};

export default Question;
