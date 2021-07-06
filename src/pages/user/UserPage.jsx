import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';
import UserService from '../../services/UserService';
import { AlertContext } from '../../contexts/AlertContext';

const UserPage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [userList, setUserList] = useState([]);

  function standardUserList(data) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      const objectList = {
        'id': data[index].id,
        'name': data[index].username,
      };
      list.push(objectList);
    }
    return list;
  }

  async function loadUsers() {
    await UserService.List()
      .then(data => {
        const list = standardUserList(data);
        setUserList(list);
      });
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function remove(id) {
    if (Number.isInteger(id)) {
      await UserService.Remove(id).catch((e) => {
        handleAlert({ status: 'error', message: e.message });
      });

      handleAlert({ status: 'success', message: 'Removido com sucesso.' });
      loadUsers();
    }
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Link className="link" to="/usuarios/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>
      <Table
        fields={
          userList
        }
        columns={
          [
            { field: 'name', headerName: 'Nome', width: 200 },
          ]
        }
        routeToChange={'/usuarios/editar/'}
        remove={remove}
      />

    </div>
  );
};

export default UserPage;
