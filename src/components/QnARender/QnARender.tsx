import React from 'react';

export interface IQuestionOrAnswer {
  id: number
  question?: string;
  answer?: string;
}

export const  QnaRender = ({ question, answer }: IQuestionOrAnswer) => {

  return (
    question
      ? <h3 className="font-bold text-lg">{question}</h3>
        : <p className="mb-2">{answer}</p>
  )
};
