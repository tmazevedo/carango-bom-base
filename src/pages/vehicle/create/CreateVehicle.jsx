import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

const CreateVehicle = () => {
  const history = useHistory();
  const [brandsList, setBrandsList] = useState([]);
  const [loadedVehicle, setloadedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function onSubmit(value) {
    const objectVehicle = {
      model: value.model,
      year: parseInt(value.year, 10),
      value: parseInt(value.value, 10),
      idBrand: parseInt(value.brand, 10),
    };

    if (id) {
      VehicleService.UpdateVehicle(objectVehicle, id);
    } else {
      VehicleService.Save(objectVehicle);
    }

    history.push('/veiculos');
  }

  useEffect(() => {
    async function getBrands() {
      const brands = await BrandService.List();
      setBrandsList(brands);
    }

    async function findCar() {
      const vehiclePromise = VehicleService.FindById(id);

      const vehicle = await vehiclePromise;
      setloadedVehicle({
        ...vehicle,
        brand: vehicle.brand.id,
        year: parseInt(vehicle.year, 10),
        value: parseInt(vehicle.value, 10),
      });
    }

    if (id) findCar();
    getBrands();
  }, [id]);

  useEffect(() => {
    if (brandsList.length && ((id && loadedVehicle) || !id)) {
      setLoading(false);
    }
  }, [brandsList, id, loadedVehicle]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Form
      mainButton={{
        text: 'Salvar',
        onSubmit,
      }}
      fields={[
        {
          name: 'brand',
          label: 'Marca',
          componentType: 'select',
          options: brandsList,
          required: true,
        },
        { name: 'model', label: 'Modelo', required: true },
        { name: 'year', label: 'Ano', required: true },
        { name: 'value', label: 'Valor', required: true },
      ]}
      defaultValues={loadedVehicle}
    />
  );
};

export default CreateVehicle;
