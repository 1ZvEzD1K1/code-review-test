import React from 'react';

export interface IAnswer {
  answer: string;
}

const Answer = ({ answer }: IAnswer) => {
  return <h3 className="font-bold text-lg">{answer}</h3>;
};

export default Answer;
