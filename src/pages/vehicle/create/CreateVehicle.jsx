import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

const CreateVehicle = () => {
  const [brandList, setbrandList] = useState([]);
  const [vehicleFind, setVehicleFind] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  function onSubmit(value) {
    if (id) {
      const objectVehicle = {
        'model': value.model,
        'year': parseInt(value.year),
        'value': parseInt(value.value),
        'idBrand': parseInt(value.idBrand),
      };
      VehicleService.UpdateVehicle(objectVehicle, id);
    } else {
      VehicleService.Save(value);
      history.goBack();
    }
    history.goBack();
  }

  const findCar = () => {
    if (id) {
      VehicleService.FindById(id).then(dataFind => {
        const objectVehicle = {
          'model': dataFind.model,
          'year': parseInt(dataFind.year),
          'value': parseInt(dataFind.value),
          'idBrand': dataFind.brand,
        };
        setVehicleFind(objectVehicle);
        setLoading(false);
      });
      BrandService.List()
        .then(data => {
          setbrandList(data);
        });
    } else {
      BrandService.List()
        .then(data => {
          setbrandList(data);
          setLoading(false);
        });
    }
  };

  useEffect(async () => {
    findCar();
  }, []);

  return (
    loading ? <CircularProgress />
      : <Form
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
        value={vehicleFind}
      />
  );
};

export default CreateVehicle;
