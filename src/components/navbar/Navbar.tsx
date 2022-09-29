// Copyright 2022 Social Fabric, LLC

import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { LoggedInUserContext } from '../../data/users';
import { getItems, NavItem } from './navBarItems';

const Navbar: React.FC = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [items, setItems] = useState<NavItem[]>([]);

  useEffect(() => setItems(getItems(loggedInUser.role)), [loggedInUser]);

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
