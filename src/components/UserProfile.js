import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const auth = useAuth();
    const [user, setUser] = useState({
      name: '', email: '', createdAt: ''
    });

    const headers = {
      headers : {
        Authorization: `Bearer ${auth.user.sessionToken}`
      }
    }

    useEffect (() => {
      const fetchUserProfile = async() => {
        try {
          const response = await axios.get("http://localhost:4001/api/v1/get-user-profile", headers);
          console.log(response.data.userProfile);
          setUser(response.data.userProfile);
        } catch(error) {
          console.log(`Error :: ${error}`);
          setUser(null);
        }
        
      }
      fetchUserProfile();
    }, [auth.user.sessionToken])

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <nav>
        <Link to="/edit-profile">Edit Profile</Link>
      </nav>
      <Outlet />
      <button onClick={auth.logout}>Logout</button>
    </div>
  )
}

export default UserProfile
