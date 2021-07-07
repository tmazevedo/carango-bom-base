import React, { useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Form from '../../components/form';
import { AuthContext } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { authenticated, handleLogin } = useContext(AuthContext);
  const history = useHistory();

  function onSubmit(value) {
    handleLogin(value.user, value.password);
  }

  useEffect(() => {
    // eslint-disable-next-line
    const token = localStorage.getItem('token');

    if (authenticated) {
      history.push('/dashboard');
    }

    // if (token) {
    //   // eslint-disable-next-line
    //   setAuthenticated(true);
    // }
  }, [authenticated, history]);

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
