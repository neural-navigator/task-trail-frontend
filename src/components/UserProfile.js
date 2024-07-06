import React from 'react';
import { useAuth } from './AuthProvider';
import { Link, Outlet } from 'react-router-dom';

const UserProfile = () => {
    const auth = useAuth();
  return (
    <div>
      Hello, {auth.user.username}
      <nav>
        <Link to="/edit-profile">Edit Profile</Link>
      </nav>
      <Outlet />
      <button onClick={auth.logout}>Logout</button>
    </div>
  )
}

export default UserProfile
