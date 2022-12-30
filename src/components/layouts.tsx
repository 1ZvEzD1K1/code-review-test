import clsx from 'clsx';
import { ReactNode } from 'react';

export const CenteredLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  // TODO is there a better way to fill available remaining height?
  // scroll height seems bugged :\
  // -------------------------------------------------------------
  // DONE : h-screen + set style #root in index.css
  <div
    className={clsx(
      'flex flex-col items-center justify-center h-screen pb-32 text-slate-700',
      className,
    )}
  >
    {children}
  </div>
);
