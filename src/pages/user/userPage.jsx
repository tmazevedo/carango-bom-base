import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import "./userPage.scss";
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';


const colunas = [
    { field: 'nome', headerName: 'Nome', width: 200 }
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




function UserPage() {
    const [user, setuser] = useState([{ "id": '10', "nome": "teste" }, { "id": '1', "nome": "teste" }]);
    const [userSelecionada, setuserSelecionada] = useState();
    const classes = useStyles();
    const history = useHistory();

    function createUser() {
        history.push('/createUser');
    }

    return (
        <div style={{ height: 300, width: '100%' }}>

            <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '767px' }}
                onClick={() => createUser()}
            >
                Criar Usuario
            </Button>
            <br />
            <br />
            <DataGrid
                rows={user}
                columns={colunas}
                onRowSelected={gridSelection => setuserSelecionada(gridSelection.data)}
            />

            <div className={classes.actionsToolbar}>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    disabled={!userSelecionada}
                // onClick={() => excluir()}
                >
                    Excluir
                </Button>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="primary"
                    disabled={!userSelecionada}
                // onClick={() => alterar()}
                >
                    Alterar
                </Button>
            </div>
        </div>
    );

}

export default UserPage;