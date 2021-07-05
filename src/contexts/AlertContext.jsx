import React, { createContext, useState, useEffect } from 'react';
import CustomAlert from '../components/alert/CustomAlert';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [customModal, setCustomModal] = useState({ hidden: true, status: 'error', message: '' });

    function handleAlert(props) {
        setCustomModal({ hidden: props.hidden, status: props.status, message: props.message });
    }

    return (
        <AlertContext.Provider value={{ handleAlert }}>
            <CustomAlert hidden={customModal.hidden} status="error" message={customModal.message}> </CustomAlert>
            {children}
        </AlertContext.Provider>
    );
};

export { AlertContext, AlertProvider };
