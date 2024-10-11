import React, { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  user: null,
  loginAction: (userData) => {},
  logoutAction: () => {},
  isAuthenticated: false,
  setIsAuthenticated: ()=>{},
  getToken: ()=>{},
});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  // membuat isAuth dan setIsAuth
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useState(()=>{
    if(user){
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
    }
  },[user])

  const loginAction = async(userData, token) => {
    setUser(userData);
    localStorage.setItem('user', userData);
    localStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 7, secure: true });
  };

  const getToken = () => {
    // return localStorage.getItem('token');
    return process.env.REACT_APP_API_TOKEN
  }

  const logoutAction = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logoutAction, isAuthenticated, setIsAuthenticated, getToken }}  >
      {children}
    </AuthContext.Provider>
  );

}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };