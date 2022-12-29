import { useState } from 'react';
import { CenteredLayout } from '~/components';
import { Button, ButtonOrNull } from '~/components/Button/Button';

// TODO is there a way to not write this twice? =\
export enum ButtonType {
  'fast',
  'quality',
  'cheap'
}
const buttons = (Object.values(ButtonType).filter(button => isNaN(Number(button))) as Array<ButtonType>);

export const Refactor1 = () => {
  const [selectedButton, setSelectedButton] = useState<ButtonOrNull>(null);
  return (
    <CenteredLayout className="gap-4">
      <div className="text-3xl">See the code</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {buttons.map((button) => (
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
