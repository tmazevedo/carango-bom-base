import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Form from '../../components/form';
import { AuthContext } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);

  function onSubmit(value) {
    handleLogin(value.user, value.password);
  }

  useEffect(() => {
    // eslint-disable-next-line
    const token = localStorage.getItem('token');

    // if (token) {
    //   // eslint-disable-next-line
    //   setAuthenticated(true);
    // }
  }, []);

  return (
    <Container maxWidth="xs">
      <Form
        mainButton={{
          text: 'Login',
          onSubmit,
        }}
        secondaryButton={{
          text: 'Recuperar senha',
          onSubmit,
        }}
        fields={[
          { name: 'user', label: 'Usuário', required: true },
          {
            name: 'password', label: 'Senha', type: 'password', required: true,
          },
        ]}
      />
    </Container>
  );
};

export default LoginPage;
