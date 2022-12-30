import React from 'react';
import { NavItem } from '~/components/NavItem';
import { NavLinkEnums } from '~/components/NavItem/NavLinkEnums';
import { capitalize, makeArrayFromEnum, replacePunctuation } from '~/utils';

const navItems = makeArrayFromEnum(NavLinkEnums);

export const Header = () => {
  return (
    <header className="sticky top-0 w-full">
      <nav className="bg-gray-600 shadow-lg">
        <ul className="flex items-center">
          <NavItem to="/">Home</NavItem>
          {
            navItems.map(navItem => (
              <NavItem key={navItem} to={ `/${navItem}` }>
                {capitalize(replacePunctuation(navItem))}
              </NavItem>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}
