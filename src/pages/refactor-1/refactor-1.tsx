import clsx from 'clsx';
import { useState } from 'react';
import { CenteredLayout } from '~/components';

// TODO is there a way to not write this twice? =\
// const buttons: ButtonType[] = ['fast', 'quality', 'cheap'];
// type ButtonType = 'fast' | 'quality' | 'cheap';

// using enum and running through it`s keys possibly could solve this
enum ButtonsType {
  fast = 'fast',
  quality = 'quality',
  cheap = 'cheap'
}


interface ButtonProps {
  button: ButtonsType;
  selectedButton: ButtonsType | null;
  setSelectedButton: (value: ButtonsType) => void;
}

// TODO is it possible to improve this component's interface (props)?
//So to let the parent el when to re-render we should lift state up using setSelectedButton func, so it`s required to share it with Button. Value of selectedButton is used to compare active button with one that is currently shared with component, and button prop used for comparing and for a content. So it`s seems that all props where required here. 
const Button = ({ button, selectedButton, setSelectedButton }: ButtonProps) => {
  const style = button === selectedButton;
  return (
    <button
      onClick={() => setSelectedButton(button)}
      className={clsx(
        'h-10 px-5 flex items-center justify-center rounded transition-colors',
        style ? 'bg-green-400' : 'bg-gray-300',
      )}
    >
      {button}
    </button>
  );
};

export const Refactor1 = () => {
  const [selectedButton, setSelectedButton] = useState<ButtonsType | null>(null);
  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {Object.values(ButtonsType).map((button) => (
          <Button
            key={button}
            button={button}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>
    </CenteredLayout>
  );
};
