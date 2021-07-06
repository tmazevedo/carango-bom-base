import React, { createContext, useState, useEffect } from 'react';
import CustomAlert from '../components/alert/CustomAlert';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [customModal, setCustomModal] = useState({
    hidden: true,
    status: 'error',
    message: '',
  });

  function onClose() {
    setCustomModal({ hidden: true, status: 'error', message: '' });
  }

  function handleAlert(props) {
    setCustomModal({
      hidden: false,
      status: props.status,
      message: props.message,
    });
  }

  return (
    <AlertContext.Provider value={{ handleAlert }}>
      <CustomAlert
        hidden={customModal.hidden}
        status={customModal.status}
        message={customModal.message}
        onClose={onClose}
      />
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
