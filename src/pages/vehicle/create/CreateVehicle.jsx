import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

const CreateVehicle = () => {
  const [brandList, setbrandList] = useState([]);
  const history = useHistory();

  function onSubmit(value) {
    VehicleService.Save(value);
    history.goBack();
  }

  useEffect(() => {
    async function loadBrands() {
      await BrandService.List()
        .then(data => {
          setbrandList(data);
        });
    }
    loadBrands();
  }, []);

  return (
    <>
      <Form
        mainButton={{
          text: 'Salvar',
          onSubmit,
        }}
        fields={[
          {
            name: 'idBrand',
            label: 'Marca',
            componentType: 'autocomplete',
            options: brandList,
            required: true,
          },
          { name: 'model', label: 'Modelo', required: true },
          { name: 'year', label: 'Ano', required: true },
          { name: 'value', label: 'Valor', required: true },
        ]}
      />
    </>
  );
};

export default CreateVehicle;
