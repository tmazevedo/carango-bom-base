import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from '../services/LoginService';
import { AlertContext } from './AlertContext';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const { handleAlert } = useContext(AlertContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  async function handleLogin(user, password) {
    if (user && password) {
      await LoginService.auth(user, password).then((data) => {
        setAuthenticated(true);
        localStorage.setItem('token', String(data.token));
        history.push('/dashboard');
      }).catch((e) => {
        handleAlert({ status: 'error', message: e.message });
        history.push('/login');
      });
    }
  }

  function handleLogout() {
    setAuthenticated(false);

    localStorage.removeItem('token');
    history.push('/login');
  }

  function validateUserToken(token) {
    if (!token || token.trim() === '') {
      handleLogout();
      return false;
    }

    const isValid = AuthService.verifyToken(token);

    if (!isValid) handleLogout();

    return isValid;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated, handleLogin, handleLogout, validateUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
