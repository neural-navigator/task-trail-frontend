import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const setDefaultUser = () => {
    setUser({
      name: '',
      email: '',
      password: ''
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    const response = await axios.post("http://localhost:4001/api/v1/create-user", user);
    console.log(response);
    setDefaultUser();
  }

  return (
    <div>
      Signup page
      <form onSubmit={handleSubmit}>
        <label>
          Full Name: <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required/>
        </label>
        <label>
          Email: <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/>
        </label>
        <label>
          Password: <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required/>
        </label>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup
