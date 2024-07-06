import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Landingpage = () => {
  return (
    <div>
      Landingpage

      <nav>
        <Link to="signup">Signup</Link>
        <Link to="login">Login</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Landingpage
