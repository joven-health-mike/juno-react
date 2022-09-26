// Copyright 2022 Social Fabric, LLC

import React, { useContext } from 'react';
import { User, UsersContext } from '../../data/users';
import CreateUserForm from '../forms/CreateUserForm';
import Navbar from '../navbar/Navbar';
import { getItems } from '../navbar/navBarItems';

type AccountDetailPageProps = {
  defaultUser: User;
};

const AccountDetailPage: React.FC<AccountDetailPageProps> = ({
  defaultUser,
}) => {
  const role = 'admin';

  const { users } = useContext(UsersContext);

  const onFormSubmit = (user: User) => {
    if (defaultUser) modifyUser(user);
    else throw new Error(); // parent page didn't pass in a default user
  };

  const modifyUser = (modifiedUser: User) => {
    const newUsers = users.map(mappedUser => {
      // this should use an ID instead of the name - changes to the name won't save using this code.
      if (modifiedUser.name === mappedUser.name) return modifiedUser;
      else return mappedUser;
    });
    // setUsers(newUsers);
  };

  const onFormCancel = () => {
    // what should we do if cancel is clicked here? go to Users page? go back?
    //window.location.href = "/users"
  };

  return (
    <div className={'mainContainer'}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Account Details</h1>
      <CreateUserForm
        defaultUser={defaultUser}
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
      />
    </div>
  );
};

export default AccountDetailPage;
