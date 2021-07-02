import React from 'react';
import Form from '../../../components/form';

const CreateBrand = () => {
  return (
    <Form
      fields={[
        { name: 'brand', label: 'Marca', required: true },
      ]}
      mainButton={{
        text: 'Salvar',
        onSubmit: () => { },
      }}
    />
  );
};

export default CreateBrand;
