import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const colunas = [
  { field: "marca", headerName: "Marca", width: 200 },
  { field: "modelo", headerName: "Modelo", width: 200 },
  { field: "ano", headerName: "Ano", width: 200 },
  { field: "valor", headerName: "Valor", width: 200 },
];

const VehiclePage = () => {
  const [vehicle,] = useState([
    { id: "10", marca: "teste", modelo: "teste", ano: "teste", valor: "teste" },
  ]);
  const [vehicleSelected, setvehicleSelected] = useState();

  function remove() {}

  return (
    <div style={{ height: "50vh" }}>
      <Link className="link" to="/veiculos/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>

      <DataGrid
        hideFooter="true"
        rows={vehicle}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setvehicleSelected(gridSelection.data)
        }
      />

      <div className="action-itens">
        <Button
          className="action-item"
          variant="outlined"
          color="secondary"
          disabled={!vehicleSelected}
          onClick={() => remove()}
        >
          Excluir
        </Button>

        <Link className="link" to={"/veiculos/editar/" + vehicleSelected?.id}>
          <Button
            className="action-item"
            variant="outlined"
            color="primary"
            disabled={!vehicleSelected}
          >
            Alterar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VehiclePage;
