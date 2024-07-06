import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const setDefaultUser = () => {
    setUser({
      email: '',
      password: ''
    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser( prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/verify-user", user);

      if (response.OK) {
        navigate('/dashboard', {replace: true});
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div>
      login page
      <form onSubmit={handleLogin}>
      <label>
        User Email:
          <input type="text" name="email" id="email" value={user.email} onChange={handleChange}/>
      </label>
      <label>
        User Password:
          <input type="password" name="password" id="password" value={user.password} onChange={handleChange}/>
      </label>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
