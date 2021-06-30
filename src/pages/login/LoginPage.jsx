import React from 'react';
import Container from '@material-ui/core/Container';
import Form from '../../components/form';
import LoginService from '../../services/LoginService';

const LoginPage = () => {
  function onSubmit(value) {
    // eslint-disable-next-line no-console
    console.log(value.usuario);
    LoginService.auth(value.usuario, value.senha).then(valor => console.log(valor));
    // LoginService.teste().then(valor => console.log(valor));
    console.log(value);
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
