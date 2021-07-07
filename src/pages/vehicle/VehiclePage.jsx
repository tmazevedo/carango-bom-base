import React, { useEffect, useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Table from '../../components/table/table';
import VehicleService from '../../services/Vehicleservice';
import { AlertContext } from '../../contexts/AlertContext';

const VehiclePage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [vehicleList, setVehicleList] = useState([]);
  const history = useHistory();

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

  async function remove(id) {
    if (Number.isInteger(parseInt(id, 10))) {
      try {
        await VehicleService.Remove(id);

        handleAlert({ status: 'success', message: 'Removido com sucesso.' });

        const newList = [...vehicleList];
        const userIndex = vehicleList.findIndex((obj) => obj.id === id);
        newList.splice(userIndex, 1);
        setVehicleList(newList);
      } catch (error) {
        handleAlert({ status: 'error', message: error.message });
      }
    }
  }

  return (
    <div style={{ height: '50vh' }}>
      <Button onClick={() => { history.push('/veiculos/novo'); }} className="custom-button" variant="outlined" color="primary">
        Novo
      </Button>

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
