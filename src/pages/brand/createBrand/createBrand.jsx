import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
// import MarcaService from '../services/MarcaService';
import { makeStyles } from '@material-ui/core';


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

function CreateBrand() {

    const [brand, setBrand] = useState("");
    const history = useHistory();
    const classes = useStyles();


    function cancel() {
        history.goBack();
    }

    return (
        <form >
            <TextField
                value={brand}
                onChange={evt => setBrand(evt.target.value)}
                // onBlur={validarCampos}
                // helperText={erros.marca.texto}
                // error={!erros.marca.valido}
                name="brand"
                id="brand"
                label="Marca"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />
            <div className={classes.actionsToolbar}>
                <Button
                    variant="contained"
                    className={classes.actions}
                    color="primary"
                    type="submit"
                >
                    Cadastrar
                    {/* {id ? 'Alterar' : 'Cadastrar'} */}
                </Button>

                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    onClick={cancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}

export default CreateBrand;