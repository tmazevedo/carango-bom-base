import { Button } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';
import BrandService from '../../services/BrandService';
import { AlertContext } from '../../contexts/AlertContext';

const BrandPage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [brandList, setBrandList] = useState([]);

  function standardBrandList(data) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      const objectList = {
        id: data[index].id,
        name: data[index].name,
      };
      list.push(objectList);
    }
    return list;
  }

  useEffect(() => {
    async function loadBrands() {
      await BrandService.List()
        .then((data) => {
          const list = standardBrandList(data);
          setBrandList(list);
        });
    }
    loadBrands();
  }, []);

  async function remove(id) {
    if (Number.isInteger(id)) {
      try {
        const response = await BrandService.Remove(id);

        if (response.status === 409) {
          handleAlert({ status: 'error', message: 'Não pode deletar marca com carros associados.' });
          return;
        }
        if (response.status !== 200) {
          handleAlert({ status: 'error', message: 'Não foi possivel deletar a marca.' });
          return;
        }

        handleAlert({ status: 'success', message: 'Removido com sucesso.' });

        const newList = [...brandList];
        const userIndex = brandList.findIndex((obj) => obj.id === id);
        newList.splice(userIndex, 1);
        setBrandList(newList);
      } catch (error) {
        handleAlert({ status: 'error', message: error.message });
      }
    }
  }

  return (
    <div style={{ height: '50vh' }}>
      <Link className="link" to="/marcas/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>
      <Table
        fields={
          brandList
        }
        columns={
          [
            { field: 'name', headerName: 'Marca', width: 200 },
          ]
        }
        routeToChange="/marcas/editar/"
        remove={remove}
      />

    </div>
  );
};

export default BrandPage;
