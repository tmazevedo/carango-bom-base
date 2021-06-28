import React from 'react';
import Forms from '../../components/forms/forms';

const LoginPage = ({ changePageTitle }) => {
  changePageTitle('Entrar');

  function onSubmit(value) {
    // eslint-disable-next-line no-console
    console.log(value);
  }

  return (
    <Forms
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
