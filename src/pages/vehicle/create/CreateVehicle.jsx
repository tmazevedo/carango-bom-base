import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

const CreateVehicle = () => {
  const history = useHistory();
  const [brandList, setbrandList] = useState([]);
  const [vehicleFind, setVehicleFind] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function onSubmit(value) {
    if (id) {
      const objectVehicle = {
        model: value.model,
        year: parseInt(value.year, 10),
        value: parseInt(value.value, 10),
        idBrand: parseInt(value.idBrand, 10),
      };
      VehicleService.UpdateVehicle(objectVehicle, id);
    } else {
      VehicleService.Save(value);
    }

    history.push('/veiculos');
  }

  useEffect(() => {
    async function findCar() {
      setLoading(true);
      if (id) {
        VehicleService.FindById(id).then((dataFind) => {
          const objectVehicle = {
            model: dataFind.model,
            year: parseInt(dataFind.year, 10),
            value: parseInt(dataFind.value, 10),
            idBrand: dataFind.brand,
          };
          setVehicleFind(objectVehicle);
          setLoading(false);
        });
        BrandService.List()
          .then((data) => {
            setbrandList(data);
          });
      } else {
        BrandService.List()
          .then((data) => {
            setbrandList(data);
            setLoading(false);
          });
      }
    }

    findCar();
  }, [id]);

  return (
    loading ? <CircularProgress />
      : (
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
          value={vehicleFind}
        />
      )
  );
};

export default CreateVehicle;
