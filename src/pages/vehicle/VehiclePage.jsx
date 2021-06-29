import React from 'react';
import { Button } from '@material-ui/core';
import { Link, BrowserRouter } from 'react-router-dom';
import Table from '../../components/table/table';

const VehiclePage = () => {

  function remove() { }

  return (
    <div style={{ height: '50vh' }}>
      <BrowserRouter>
        <Link className="link" to="/veiculos/novo">
          <Button className="custom-button" variant="outlined" color="primary">
            Novo
          </Button>
        </Link>
      </BrowserRouter>

      <Table
        fields={
          [
            {
              id: '10', marca: 'teste', modelo: 'teste', ano: 'teste', valor: 'teste',
            },
          ]
          // List from BackEnd
        }
        colunas={
          [
            { field: 'marca', headerName: 'Marca', width: 200 },
            { field: 'modelo', headerName: 'Modelo', width: 200 },
            { field: 'ano', headerName: 'Ano', width: 200 },
            { field: 'valor', headerName: 'Valor', width: 200 },
          ]
        }
        routeToChange={'/veiculos/editar/'}
        remove={remove}
      />
    </div>
  );
};

export default VehiclePage;
