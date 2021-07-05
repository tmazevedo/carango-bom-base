import React, { useState, useContext, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const CustomAlert = ({ hidden, status, message }) => {
    const [open, setOpen] = React.useState(true);
    // const [customModal, setCustomModal] = useState({ hidden: true, status: '', message: '' });

    // useEffect(() => {
    //     setCustomModal({ hiddem: hidden, status: status, message: message });
    // }, []);

    return (
        <>
            <Collapse hidden={hidden} in={open}>
                <Alert variant="outlined" className="alert" severity={status} onClose={() => setOpen(false)}>{message}</Alert>
            </Collapse>
        </>
    );
};

export default CustomAlert;
