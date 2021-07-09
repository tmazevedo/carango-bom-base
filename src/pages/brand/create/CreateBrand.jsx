import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import { AlertContext } from '../../../contexts/AlertContext';

const CreateBrand = () => {
  const { handleAlert } = useContext(AlertContext);
  const history = useHistory();
  const { id } = useParams();
  const [brandFind, setBrandFind] = useState('');
  const [loading, setLoading] = useState(true);

  async function onSubmit(value) {
    try {
      if (id) {
        await BrandService.UpdateBrand(JSON.stringify(value), id);
        handleAlert({ status: 'success', message: 'Alterado com sucesso.' });
      } else {
        await BrandService.Save(value);
        handleAlert({ status: 'success', message: 'Salvo com sucesso.' });
      }
      history.push('/marcas');
    } catch (e) {
      handleAlert({ status: 'error', message: e.message });
    }
  }

  useEffect(() => {
    async function findBrand() {
      if (id) {
        const brand = await BrandService.FindById(id);
        setBrandFind({
          name: brand.name,
        });
      }
      setLoading(false);
    }
    findBrand();
  }, [id]);

  return (
    loading
      ? <CircularProgress />
      : (
        <>
          <Button
            onClick={() => { history.push('/marcas'); }}
            className="custom-button"
            variant="outlined"
            color="primary"
          >
            Voltar
          </Button>
          <br />
          <Form
            fields={[
              { name: 'name', label: 'Marca', required: true },
            ]}
            mainButton={{
              text: 'Salvar',
              onSubmit,
            }}
            value={brandFind}
            defaultValues={{ name: brandFind.name }}
          />
        </>
      )
  );
};

export default CreateBrand;
