import { colorToClassName, Range } from '~/pages/ranges/utils';
import clsx from 'clsx';

export const RangesView = ({ ranges }: { ranges: Range[] }) => (
  <ul className='space-y-4'>
    { ranges.map(({ start, end, color }) => {
      return (
        <li
          key={ start + end }
          className={ clsx(
            'h-10 flex items-center justify-between px-5 rounded',
            // colorToClassName[color] <-- that works as well, but
            `bg-${ color }-300 text-${ color }-900`, //? can we use here a template string here?
          ) }
        >
          <span>{ start }</span>
          <span>{ end }</span>
        </li>
      );
    }) }
  </ul>
);