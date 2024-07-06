import React from 'react'
import { useAuth } from './AuthProvider'

const UserDashboard = () => {
    const auth = useAuth();
  return (
    <div>
      Hello, {auth.user}
    </div>
  )
}

export default UserDashboard
