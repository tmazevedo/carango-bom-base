import React, { useEffect, useState } from 'react';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

function onSubmit(value) {
  // eslint-disable-next-line no-console
  console.log(value);
}

const CreateVehicle = () => {
  const [brandList, setbrandList] = useState([]);

  function standardBrandList(data) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      list.push(data[index].name);
    }
    return list;
  }

  useEffect(() => {
    async function loadBrands() {
      await BrandService.List()
        .then(data => {
          const list = standardBrandList(data);
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
