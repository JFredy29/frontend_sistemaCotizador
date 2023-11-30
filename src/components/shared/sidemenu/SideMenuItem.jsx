import React from 'react';
import { NavLink } from 'react-router-dom';

export const SideMenuItem = ({ href, Icon, title, subTitle }) => {
  return (
    <NavLink
      key={ href }
      to={ href }
      end
    >
      <div>
        { Icon }
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{ title }</span>
        <span className="text-sm text-white/50 hidden md:block">{ subTitle }</span>
      </div>
    </NavLink>
  );
}