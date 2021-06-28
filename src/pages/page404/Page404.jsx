import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@material-ui/core';

const Page404 = ({ changePageTitle }) => {
  changePageTitle('Página não encontrada');

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <br />
      <ErrorIcon style={{ fontSize: 100 }} variant="outlined" color="primary" />
      <Typography variant="h4"> Página não encontrada</Typography>
    </div>
  );
};

export default Page404;
