import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginService from '../services/LoginService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

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
        console.log('teste');
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
