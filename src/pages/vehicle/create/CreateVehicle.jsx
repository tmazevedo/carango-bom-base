import React from 'react';
import Form from '../../../components/form';

function onSubmit(value) {
  // eslint-disable-next-line no-console
  console.log(value);
}

const CreateVehicle = () => (
  <>
    <Form
      mainButton={{
        text: 'Salvar',
        onSubmit,
      }}
      fields={[
        {
          name: 'marca',
          label: 'Marca',
          componentType: 'autocomplete',
          options: ['Volks', 'Peugeot', 'Xablau'],
          required: true,
        },
        { name: 'modelo', label: 'Modelo', required: true },
        { name: 'valor', label: 'Valor', required: true },
      ]}
    />
  </>
);

export default CreateVehicle;
