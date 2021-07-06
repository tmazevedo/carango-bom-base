import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';

const CreateBrand = () => {
  const history = useHistory();
  const { id } = useParams();
  const [brandFind, setBrandFind] = useState('');
  const [loading, setLoading] = useState(true);

  function onSubmit(value) {
    if (id) {
      BrandService.UpdateUser(JSON.stringify(value), id);
      history.goBack();
    } else {
      BrandService.Save(value);
      history.goBack();
    }
    history.goBack();
  }

  const findBrand = () => {
    if (id) {
      BrandService.FindById(id).then(dataFind => {
        const objectVehicle = {
          'name': dataFind.name,
        };
        setBrandFind(objectVehicle);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(async () => {
    findBrand();
  }, []);

  return (
    loading ? <CircularProgress />
      : <Form
        fields={[
          { name: 'name', label: 'Marca', required: true },
        ]}
        mainButton={{
          text: 'Salvar',
          onSubmit,
        }}
        value={brandFind}
      />
  );
};

export default CreateBrand;
