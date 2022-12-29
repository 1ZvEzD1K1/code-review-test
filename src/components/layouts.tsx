import clsx from 'clsx';
import { FC, ReactNode } from 'react';

type TCenteredLayout = {
  className?: string;
  children: ReactNode;
};

export const CenteredLayout: FC<TCenteredLayout> = ({ className, children }) => (
  // TODO is there a better way to fill available remaining height?
  // scroll height seems bugged :\
  <div
    className={clsx('flex flex-col items-center justify-center h-screen text-slate-700', className)}
  >
    {children}
  </div>
);
