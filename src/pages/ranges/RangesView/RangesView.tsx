import clsx from 'clsx';
import { FC, memo } from 'react';
import { Range } from '~/types/Ranges';
import { colorToClassName } from '../utils';

type Props = {
  ranges: Range[],
}

export const RangesView: FC<Props> = memo(({ ranges }) => (
  <ul className="space-y-4">
    {ranges.map((item) => (
      <li
        key={item.start + item.end}
        className={clsx(
          'h-10 flex items-center justify-between px-5 rounded',
          colorToClassName[item.color],
        )}
      >
        <span>{item.start}</span>
        <span>{item.end}</span>
      </li>
    ))}
  </ul>
));
