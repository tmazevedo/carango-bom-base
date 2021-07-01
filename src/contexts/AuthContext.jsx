import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from '../services/LoginService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        const token = localStorage.getItem('token');

        if (token) {
            // eslint-disable-next-line
          localStorage.setItem('token', JSON.stringify(token));
          setAuthenticated(true);
        }
    }, []);

    async function handleLogin(props) {
        if (props) {
            const token = await LoginService.auth(props.usuario, props.senha);
            setAuthenticated(true);

            // eslint-disable-next-line
            localStorage.setItem('token', JSON.stringify(token));
        }

        history.push('/');
    }

    function handleLogout() {
        setAuthenticated(false);

        // eslint-disable-next-line
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
