import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Form from '../../components/form';
import { AuthContext } from '../../contexts/AuthProvider';

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);

  function onSubmit(value) {
    handleLogin(value);
  }

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
          { name: 'usuario', label: 'Usuário', required: true },
          {
            name: 'senha', label: 'Senha', type: 'password', required: true,
          },
        ]}
      />
    </Container>
  );
};

export default LoginPage;
