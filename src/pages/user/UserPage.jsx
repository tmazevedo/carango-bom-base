import React, { useState, useEffect, useContext } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Table from '../../components/table/table';
import UserService from '../../services/UserService';
import { AlertContext } from '../../contexts/AlertContext';

const UserPage = () => {
  const { handleAlert } = useContext(AlertContext);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function standardUserList(data) {
    const list = [];
    data.forEach((element) => {
      list.push({
        id: String(element.id),
        name: String(element.username),
      });
    });
    return list;
  }

  useEffect(() => {
    async function loadUsers() {
      const users = await UserService.List();
      const list = standardUserList(users);
      setUserList(list);
      setLoading(false);
    }

    setLoading(true);
    loadUsers();
  }, []);

  async function remove(id) {
    setLoading(true);
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
    setLoading(false);
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      {
        loading ? <CircularProgress />
          : (
            <>
              <Button onClick={() => { history.push('/usuarios/novo'); }} className="custom-button" variant="outlined" color="primary">
                Novo
              </Button>
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
            </>
          )
      }
    </div>
  );
};

export default UserPage;
