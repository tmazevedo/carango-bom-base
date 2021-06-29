import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';

const BrandPage = () => {

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
          [
            { id: '10', brand: 'teste' },
          ]

          // List from BackEnd
        }
        colunas={
          [
            { field: 'brand', headerName: 'Marca', width: 200 },
          ]
        }
        routeToChange={'/marcas/editar/'}
        remove={remove()}
      />

    </div>
  );
};

export default BrandPage;
