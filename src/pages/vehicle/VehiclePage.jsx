import React, { useEffect, useState, useContext } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Table from '../../components/table/table';
import VehicleService from '../../services/Vehicleservice';
import { AlertContext } from '../../contexts/AlertContext';

const VehiclePage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [vehicleList, setVehicleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function standardVehicleList(data) {
    const list = [];
    data.forEach((element) => {
      list.push({
        id: String(element.id),
        brand: element.brand.name,
        model: element.model,
        year: String(element.year),
        value: String(element.value),
      });
    });
    return list;
  }

  useEffect(() => {
    async function loadVehicles() {
      const vehicles = await VehicleService.List();
      const list = standardVehicleList(vehicles);
      setVehicleList(list);
      setLoading(false);
    }
    setLoading(true);
    loadVehicles();
  }, []);

  async function remove(id) {
    try {
      if (!Number.isInteger(parseInt(id, 10))) {
        throw new Error('Vehicle ID is not an integer');
      }

      await VehicleService.Remove(id);
      handleAlert({ status: 'success', message: 'Removido com sucesso.' });

      const newList = [...vehicleList];
      const vehicleIndex = vehicleList.findIndex((obj) => obj.id === id);
      newList.splice(vehicleIndex, 1);
      setVehicleList(newList);
    } catch (error) {
      handleAlert({ status: 'error', message: error.message });
    }
  }

  return (
    <div style={{ height: '50vh' }}>
      <Button onClick={() => { history.push('/veiculos/novo'); }} className="custom-button" variant="outlined" color="primary">
        Novo
      </Button>

      {
        loading
          ? <CircularProgress />
          : (
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
          )
      }
    </div>
  );
};

export default VehiclePage;
