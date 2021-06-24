import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const colunas = [{ field: "nome", headerName: "Nome", width: 200 }];

const useStyles = makeStyles(() => ({}));

const UserPage = () => {
  const [user, setuser] = useState([
    { id: "10", nome: "teste" },
    { id: "1", nome: "teste" },
  ]);
  const [userSelecionada, setuserSelecionada] = useState();
  const classes = useStyles();
  const history = useHistory();

  function createUser() {
    history.push("/createUser");
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Link className="link" to="/usuarios/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>

      <DataGrid
        hideFooter="true"
        rows={user}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setuserSelecionada(gridSelection.data)
        }
      />

      <div className="action-itens">
        <Button
          className="action-item"
          variant="outlined"
          color="secondary"
          disabled={!userSelecionada}
          // onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Link className="link" to={"/usuarios/editar/" + userSelecionada?.id}>
          <Button
            className="action-item"
            variant="outlined"
            color="primary"
            disabled={!userSelecionada}
          >
            Alterar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
