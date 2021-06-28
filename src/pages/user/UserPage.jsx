import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const colunas = [{ field: 'nome', headerName: 'Nome', width: 200 }];

const UserPage = ({ changePageTitle }) => {
  changePageTitle('Usuários');

  const [user] = useState([
    { id: '10', nome: 'teste' },
    { id: '1', nome: 'teste' },
  ]);
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Link className="link" to="/usuarios/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>

      <DataGrid
        hideFooter="true"
        rows={user}
        columns={colunas}
        onRowSelected={(gridSelection) => setSelectedUser(gridSelection.data)}
      />

      <div className="action-itens">
        <Button
          className="action-item"
          variant="outlined"
          color="secondary"
        >
          Excluir
        </Button>
        <Link className="link" to={`/usuarios/editar/${selectedUser?.id}`}>
          <Button
            className="action-item"
            variant="outlined"
            color="primary"
            disabled={!selectedUser}
          >
            Alterar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
