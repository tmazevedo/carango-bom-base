import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';

const CreateBrand = () => {
  const history = useHistory();

  function onSubmit(value) {
    BrandService.Save(value);
    history.goBack();
  }

  return (
    <Form
      fields={[
        { name: 'name', label: 'Marca', required: true },
      ]}
      mainButton={{
        text: 'Salvar',
        onSubmit,
      }}
    />
  );
};

export default CreateBrand;
