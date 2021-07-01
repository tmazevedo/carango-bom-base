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
    }

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogout, authenticated }}>
            { children }
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
