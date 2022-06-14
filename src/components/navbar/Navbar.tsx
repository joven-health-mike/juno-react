// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { NavItem } from './navBarItems';

type NavbarProps = {
  items: NavItem[];
};

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={'navMenu'}>
          <ul>
            {items.map((item: NavItem, index: number) => (
              <li key={index} className={'navText'}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
