import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';
import BrandService from '../../services/BrandService';

const BrandPage = () => {
  const [brandList, setBrandList] = useState([]);

  function standardBrandList(data) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      const objectList = {
        'id': data[index].id,
        'name': data[index].name,
      };
      list.push(objectList);
    }
    return list;
  }

  useEffect(() => {
    async function loadBrands() {
      await BrandService.List()
        .then(data => {
          const list = standardBrandList(data);
          setBrandList(list);
        });
    }
    loadBrands();
  }, []);

  function remove() { }

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
        routeToChange={'/marcas/editar/'}
        remove={remove()}
      />

    </div>
  );
};

export default BrandPage;
