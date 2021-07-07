import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';
import VehicleService from '../../services/Vehicleservice';

const VehiclePage = () => {
  const [vehicleList, setVehicleList] = useState([]);

  function standardVehicleList(data) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      const objectList = {
        id: String(data[index].id),
        brand: data[index].brand.name,
        model: data[index].model,
        year: String(data[index].year),
        value: String(data[index].value),
      };
      list.push(objectList);
    }
    return list;
  }

  useEffect(() => {
    async function loadVehicles() {
      await VehicleService.List()
        .then((data) => {
          const list = standardVehicleList(data);
          setVehicleList(list);
        });
    }
    loadVehicles();
  }, []);

  function remove() { }

  return (
    <div style={{ height: '50vh' }}>
      <Link className="link" to="/veiculos/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>

      <Table
        fields={
          vehicleList
        }
        columns={
          [
            { field: 'brand', headerName: 'Marca', width: 200 },
            { field: 'model', headerName: 'Modelo', width: 200 },
            { field: 'year', headerName: 'Ano', width: 200 },
            { field: 'value', headerName: 'Valor', width: 200 },
          ]
        }
        routeToChange="/veiculos/editar/"
        remove={remove}
      />
    </div>
  );
};

export default VehiclePage;
