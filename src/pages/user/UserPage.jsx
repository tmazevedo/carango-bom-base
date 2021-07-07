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
        id: data[index].id,
        name: data[index].username,
      };
      list.push(objectList);
    }
    return list;
  }

  useEffect(() => {
    async function loadUsers() {
      await UserService.List()
        .then((data) => {
          const list = standardUserList(data);
          setUserList(list);
        });
    }

    loadUsers();
  }, []);

  async function remove(id) {
    if (Number.isInteger(id)) {
      try {
        await UserService.Remove(id);
        handleAlert({ status: 'success', message: 'Removido com sucesso.' });

        const newList = [...userList];
        const userIndex = userList.findIndex((obj) => obj.id === id);
        newList.splice(userIndex, 1);
        setUserList(newList);
      } catch (error) {
        handleAlert({ status: 'error', message: error.message });
      }
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
        routeToChange="/usuarios/editar/"
        remove={remove}
      />

    </div>
  );
};

export default UserPage;
