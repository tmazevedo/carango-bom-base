import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { DataGrid } from "@material-ui/data-grid";

import { makeStyles } from "@material-ui/core";

const colunas = [{ field: "brand", headerName: "Marca", width: 200 }];

const useStyles = makeStyles(() => ({
  fab: {
    position: "absolute",
    bottom: "100px",
    right: "100px",
  },
  actionsToolbar: {
    float: "right",
  },
  actions: {
    top: "10px",
    marginLeft: "10px",
  },
}));

const BrandPage = () => {
  const [brand, setBrand] = useState([{ id: "10", brand: "teste" }]);
  const classes = useStyles();
  const [brandSelecionada, setBrandSelecionada] = useState();
  const history = useHistory();

  function createBrand() {
    history.push("/createBrand");
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "767px" }}
        onClick={() => createBrand()}
      >
        Criar Marca
      </Button>
      <br />
      <br />
      <DataGrid
        rows={brand}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setBrandSelecionada(gridSelection.data)
        }
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!brandSelecionada}
          // onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!brandSelecionada}
          // onClick={() => alterar()}
        >
          Alterar
        </Button>
      </div>
    </div>
  );
};

export default BrandPage;
