import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./vehiclePage.scss";
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';


const colunas = [
    { field: 'marca', headerName: 'Marca', width: 200 },
    { field: 'modelo', headerName: 'Modelo', width: 200 },
    { field: 'ano', headerName: 'Ano', width: 200 },
    { field: 'valor', headerName: 'Valor', width: 200 }
];

const useStyles = makeStyles(() => ({
    fab: {
        position: 'absolute',
        bottom: '100px',
        right: '100px',
    },
    actionsToolbar: {
        float: 'right'
    },
    actions: {
        top: '10px',
        marginLeft: '10px',
    }
}));




const VehiclePage = () => {
    const [vehicle, setVehicle] = useState([{ "id": "10", "marca": 'teste', "modelo": 'teste', "ano": 'teste', "valor": "teste" }]);
    const [vehicleSelected, setvehicleSelected] = useState();
    const classes = useStyles();
    const history = useHistory();

    function createVehicle() {
        history.push('/createVehicle');
    }

    function remove() {

    }

    function change() {
        history.push('/changeVehicle/' + vehicleSelected.id);
    }

    return (
        <div style={{ height: 300, width: '100%' }}>

            <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '767px' }}
                onClick={() => createVehicle()}
            >
                Criar Veículo
            </Button>
            <br />
            <br />
            <DataGrid
                rows={vehicle}
                columns={colunas}
                onRowSelected={gridSelection => setvehicleSelected(gridSelection.data)}
            />

            <div className={classes.actionsToolbar}>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    disabled={!vehicleSelected}
                    onClick={() => remove()}
                >
                    Excluir
                </Button>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="primary"
                    disabled={!vehicleSelected}
                    onClick={() => change()}
                >
                    Alterar
                </Button>
            </div>
        </div>
    );

}

export default VehiclePage;