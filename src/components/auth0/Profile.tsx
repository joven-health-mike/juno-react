import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) return null;

  let definedUser = user;
  if (definedUser === undefined) {
    definedUser = {
      picture: '',
      name: 'User Name',
      email: 'user@email.com',
    };
  }

  return (
    <div>
      <img src={definedUser.picture} alt={definedUser.name} />
      <h2>{definedUser.name}</h2>
      <p>{definedUser.email}</p>
    </div>
  );
};

export default Profile;
