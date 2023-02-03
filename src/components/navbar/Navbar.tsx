// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AvailableRoute, pagePermission } from '../../auth/permissions';
import { LoggedInUserContext } from '../../data/users';
import { allNavItems, NavItem } from './navBarItems';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white !important;
  font-size: 18px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;
`;

const Navbar: React.FC = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const role = loggedInUser.role;

  function isRouteAllowed(route: AvailableRoute): boolean {
    return pagePermission(role, route);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={'navMenu'}>
          <ul>
            {allNavItems.map(
              (item: NavItem, index: number) =>
                isRouteAllowed(item.path as AvailableRoute) && (
                  <li key={index} className={'navText'}>
                    <StyledLink to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </StyledLink>
                  </li>
                )
            )}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
