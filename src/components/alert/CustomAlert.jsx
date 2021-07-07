import React, { useState, useContext, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';

const CustomAlert = ({
  hidden, status, message, onClose,
}) => (
  <>
    <Collapse hidden={hidden} in>
      <Alert
        variant="outlined"
        className="alert"
        severity={status}
        onClose={() => {
          onClose();
        }}
      >
        {message}
      </Alert>
    </Collapse>
  </>
);

export default CustomAlert;
