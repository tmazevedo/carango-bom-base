import React from 'react';
import Form from '../../components/form';

const LoginPage = () => {
  function onSubmit(value) {
    // eslint-disable-next-line no-console
    console.log(value);
  }

  return (
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
  );
};

export default LoginPage;
