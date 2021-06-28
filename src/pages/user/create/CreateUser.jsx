import React from 'react';
import Forms from '../../../components/forms/forms';

function onSubmit(value) {
  // eslint-disable-next-line no-console
  console.log(value);
}

const CreateUser = ({ changePageTitle }) => {
  // TODO
  changePageTitle('Criar usuário');

  return (
    <>
      <Forms
        mainButton={{
          text: 'Salvar',
          onSubmit,
        }}
        fields={[
          { name: 'usuario', label: 'Usuário', required: true },
          {
            name: 'senha', label: 'Senha', required: true, type: 'password',
          },
          {
            name: 'senha-confirmar',
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
