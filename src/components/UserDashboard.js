import React from 'react'
import { useAuth } from './AuthProvider'
import { Link, Outlet } from 'react-router-dom';

const UserDashboard = () => {
    const auth = useAuth();
  return (
    <div>
      Hello, {auth.user.username}
      <nav>
      <Link to="/profile">Profile</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/create-task">Create Task</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default UserDashboard
