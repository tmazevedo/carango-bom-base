import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

const colunas = [{ field: 'brand', headerName: 'Marca', width: 200 }];

const useStyles = makeStyles(() => ({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
  },
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
}));

const BrandPage = () => {
  const [brand] = useState([{ id: '10', brand: 'teste' }]);
  const classes = useStyles();
  const [brandSelecionada, setBrandSelecionada] = useState();

  return (
    <div style={{ height: '50vh' }}>
      <Link className="link" to="/marcas/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>

      <DataGrid
        hideFooter="true"
        rows={brand}
        columns={colunas}
        onRowSelected={(gridSelection) => setBrandSelecionada(gridSelection.data)}
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="outlined"
          color="secondary"
          disabled={!brandSelecionada}
          // onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="outlined"
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
