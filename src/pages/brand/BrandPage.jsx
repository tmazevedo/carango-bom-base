import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';
import CustomModal from '../../components/modal/CustomModal';

const colunas = [{ field: 'brand', headerName: 'Marca', width: 200 }];

const BrandPage = () => {
  const [brand] = useState([{ id: '10', brand: 'teste' }]);
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

      <div className="action-itens">
        <CustomModal />
        <Button
          className="action-item"
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
