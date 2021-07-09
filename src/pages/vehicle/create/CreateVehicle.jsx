import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress, Button } from '@material-ui/core';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';
import { AlertContext } from '../../../contexts/AlertContext';

const CreateVehicle = () => {
  const { handleAlert } = useContext(AlertContext);
  const history = useHistory();
  const [brandsList, setBrandsList] = useState([]);
  const [loadedVehicle, setloadedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function onSubmit(value) {
    const objectVehicle = {
      model: value.model,
      year: parseInt(value.year, 10),
      value: parseInt(value.value, 10),
      idBrand: parseInt(value.brand, 10),
    };

    try {
      if (id) {
        await VehicleService.UpdateVehicle(objectVehicle, id);
        handleAlert({ status: 'success', message: 'Alterado com sucesso.' });
      } else {
        await VehicleService.Save(objectVehicle);
        handleAlert({ status: 'success', message: 'Criado com sucesso.' });
      }

      history.push('/veiculos');
    } catch (e) {
      handleAlert({ status: 'error', message: e.message });
    }
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

    setLoading(true);
    if (id) findCar();
    getBrands();
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (brandsList.length && ((id && loadedVehicle) || !id)) {
      setLoading(false);
    }
  }, [brandsList, id, loadedVehicle]);

  return (
    loading ? <CircularProgress />
      : (
        <>
          <Button onClick={() => { history.push('/veiculos'); }} className="custom-button" variant="outlined" color="primary">
            Voltar
          </Button>
          <br />
          <br />
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
        </>
      )
  );
};

export default CreateVehicle;
