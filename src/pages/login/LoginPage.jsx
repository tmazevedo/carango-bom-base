import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Form from '../../components/form';
import { AuthContext } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { handleLogin, authenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      history.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  function onSubmit(value) {
    handleLogin(value.user, value.password);
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
          { name: 'user', label: 'Usuário', required: true },
          {
            name: 'password', label: 'Senha', type: 'password', required: true,
          },
        ]}
        value=""
      />
    </Container>
  );
};

export default LoginPage;
