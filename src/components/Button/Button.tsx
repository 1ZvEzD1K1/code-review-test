import React from 'react';
import clsx from 'clsx';
import { ButtonType } from '~/pages';

export type ButtonOrNull = ButtonType | null

interface ButtonProps {
  button: ButtonOrNull;
  isSelected: boolean;
  setSelectedButton: React.Dispatch<React.SetStateAction<ButtonOrNull>>;
}

// TODO is it possible to improve this component's interface (props)?
export const Button = ({ button, isSelected, setSelectedButton }: ButtonProps) => (
  <button
    onClick={ () => setSelectedButton(button) }
    className={ clsx(
      'h-10 px-5 flex items-center justify-center rounded transition-colors',
      `bg-${ isSelected ? 'green-400' : 'gray-300' }`,
    ) }
  >
    { button }
  </button>
);