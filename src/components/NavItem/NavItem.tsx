import { Link, LinkProps, useMatchRoute } from '@tanstack/react-location';
import clsx from 'clsx';

export const NavItem = (props: LinkProps) => {
  const matchRoute = useMatchRoute();
  const active = Boolean(matchRoute({ to: props.to }));
  return (
    <li className="px-4">
      <Link
        {...props}
        className={clsx(
          'relative flex items-center h-12 px-1',
          'text-slate-200 hover:text-white hover:drop-shadow shadow-white transition-all',
          'after:h-0.5 after:w-full after:bg-white after:absolute after:bottom-px after:left-0',
          'after:shadow after:shadow-white after:transition-all after:origin-center',
          active ? 'after:scale-100' : 'after:scale-0',
        )}
      />
    </li>
  );
};
