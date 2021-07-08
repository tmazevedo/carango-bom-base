import { Button, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../../components/table/table';
import BrandService from '../../services/BrandService';
import { AlertContext } from '../../contexts/AlertContext';

const BrandPage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [brandsList, setBrandsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function standardBrandsList(data) {
    const list = [];
    data.forEach((element) => {
      list.push({
        id: element.id,
        name: element.name,
      });
    });
    return list;
  }

  useEffect(() => {
    async function loadBrands() {
      const brands = await BrandService.List();
      const standardList = standardBrandsList(brands);
      setBrandsList(standardList);
      setLoading(false);
    }
    setLoading(true);
    loadBrands();
  }, []);

  async function remove(id) {
    if (!Number.isInteger(id)) {
      throw new Error('Brand ID is not an integer');
    }
    try {
      const response = await BrandService.Remove(id);

      if (response.status === 409) {
        handleAlert({ status: 'error', message: 'Não pode deletar marca com carros associados.' });
      } else if (response.status !== 200) {
        handleAlert({ status: 'error', message: 'Não foi possivel deletar a marca.' });
      } else {
        handleAlert({ status: 'success', message: 'Removido com sucesso.' });
      }

      const newList = [...brandsList];
      const userIndex = brandsList.findIndex((obj) => obj.id === id);
      newList.splice(userIndex, 1);
      setBrandsList(newList);
    } catch (error) {
      handleAlert({ status: 'error', message: error.message });
    }
  }

  return (
    <div style={{ height: '50vh' }}>
      <Button onClick={() => { history.push('/marcas/novo'); }} className="custom-button" variant="outlined" color="primary">
        Novo
      </Button>
      {
        loading
          ? <CircularProgress />
          : (
            <Table
              fields={
                brandsList
              }
              columns={
                [
                  { field: 'name', headerName: 'Marca', width: 200 },
                ]
              }
              routeToChange="/marcas/editar/"
              remove={remove}
            />
          )
      }

    </div>
  );
};

export default BrandPage;
