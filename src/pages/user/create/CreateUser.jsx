import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/form';
import UserService from '../../../services/UserService';

const CreateUser = () => {
  const history = useHistory();

  function onSubmit(value) {

    // eslint-disable-next-line no-console
    const callback = UserService.Save(value.username, value.confirmPassword);
    console.log(callback);
    history.goBack();
  }

  return (
    <>
      <Form
        mainButton={{
          text: 'Salvar',
          onSubmit,
        }}
        fields={[
          { name: 'username', label: 'Usuário', required: true },
          {
            name: 'password', label: 'Senha', required: true, type: 'password',
          },
          {
            name: 'confirmPassword',
            label: 'Confirmar senha',
            required: true,
            type: 'password',
          },
        ]}
      />
    </>
  );
};

export default CreateUser;
