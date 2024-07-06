import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    username: null,
    sessionToken: null
  });
  
  const login = ({username, sessionToken}) => {
    setUser({
      username: username,
      sessionToken: sessionToken
    })
  }
  
  const logout = () => {
    setUser({
      username: null,
      sessionToken: null
    });
  }

  return ( <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
