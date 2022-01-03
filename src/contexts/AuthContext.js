import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase'

export const AuthContext = React.createContext({})


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        history.push('/chats')
      } else {
        history.push('/')
      }
    })

  }, [history, user])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}