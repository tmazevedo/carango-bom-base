import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';
import UserService from '../../services/UserService';

const UserPage = () => {
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

  useEffect(() => {
    async function loadUsers() {
      await UserService.List()
        .then(data => {
          const list = standardUserList(data);
          setUserList(list);
        });
    }
    loadUsers();
  }, []);

  function remove(values) {
    console.log(values);
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
