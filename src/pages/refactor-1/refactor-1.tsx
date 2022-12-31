import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { CenteredLayout } from '~/components';
import { ButtonType } from '~/types/ButtonType';
import { Button } from './Button';

export const Refactor1 = () => {
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);

  const handleButtonClick = useCallback((isSelected: boolean, button: ButtonType) => {
    if (isSelected) {
      setSelectedButton(null);

      return;
    }

    setSelectedButton(button);
  }, []);

  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {Object.values(ButtonType).map((button) => {
          const isSelected = button === selectedButton;

          return (
            <Button
            key={button}
            className={clsx(
              'h-10 px-5 flex items-center justify-center rounded transition-colors',
              isSelected ? 'bg-green-400' : 'bg-gray-300',
            )}
            onClick={() => handleButtonClick(isSelected, button)}
          >
            {button}
          </Button>
          )})}
      </div>
    </CenteredLayout>
  );
};
