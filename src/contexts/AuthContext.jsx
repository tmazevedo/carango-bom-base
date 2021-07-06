import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from '../services/LoginService';
import { AlertContext } from './AlertContext';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);
    const { handleAlert } = useContext(AlertContext);

    useEffect(() => {
        // eslint-disable-next-line
        const token = localStorage.getItem('token');

        if (token) {
            // eslint-disable-next-line
            setAuthenticated(true);
        }
    }, []);

    async function handleLogin(user, password) {
        if (user && password) {
            await LoginService.auth(user, password).then((data) => {
                setAuthenticated(true);
                // eslint-disable-next-line
                localStorage.setItem('token', String((data.token)));
                history.push('/');
            });
            history.push('/dashboard');
            return;
        }

        history.push('/dashboard');
    }

    function handleLogout() {
        setAuthenticated(false);

        // eslint-disable-next-line
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
