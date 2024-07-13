import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {

  const auth = useAuth();
  const [user, setUser] = useState({
    name: '', email: ''
  });
  const [newUser, setNewUser] = useState({name: '', email: ''});
  const [changeStatus, setChangeStatus] = useState(false);

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
        setChangeStatus(true)
        setUser(response.data.userProfile);
      } catch(error) {
        console.log(`Error :: ${error}`);
        setUser(null);
      }
      
    }
    fetchUserProfile();
  }, [auth.user.sessionToken])

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/v1/edit-profile", newUser, headers);
      console.log(response);
    } catch(error) {
      console.log(`Error:: ${error}`);
    }
  }

  const changeHandler = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setNewUser( prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }


  return (
    <div>
      edit profile
      {
        changeStatus? (
          "Changes Saved"
        ): (
          <form onSubmit={submitHandler}>
        <label>
          Name: <input id="name" name="name" value={newUser.name} onChange={changeHandler} placeholder={user.name}/>
        </label>

        <label>
          Email: <input id="email" name="email" value={newUser.email} onChange={changeHandler} placeholder={user.email}/>
        </label>

        <button type="submit">Save Changes</button>

      </form>
        )
      }
      
    </div>
  )
}

export default EditProfile
