import React from 'react';
import Cookies from 'universal-cookie';
import Container from '@material-ui/core/Container';
import Form from '../../components/form';
import LoginService from '../../services/LoginService';

const LoginPage = () => {
  function onSubmit(value) {
    const cookies = new Cookies();
    LoginService.auth(value.usuario, value.senha).then(valueToken => cookies.set('token', valueToken.token));
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
