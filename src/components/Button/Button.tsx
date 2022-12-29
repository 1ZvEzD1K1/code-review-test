import React from 'react';
import clsx from 'clsx';
import { ButtonType } from '~/pages';

export type ButtonOrNull = ButtonType | null

interface ButtonProps {
  button: ButtonOrNull;
  selectedButton: ButtonOrNull;
  setSelectedButton: React.Dispatch<React.SetStateAction<ButtonOrNull>>;
}

// TODO is it possible to improve this component's interface (props)?
export const Button = ({ button, selectedButton, setSelectedButton }: ButtonProps) => {
    const style = button === selectedButton;
    return (
      <button
        onClick={() => setSelectedButton(button)}
        className={clsx(
          'h-10 px-5 flex items-center justify-center rounded transition-colors',
            `bg-${style ? 'green-400' : 'gray-300'}`
        )}
      >
        {button}
      </button>
    );
  };