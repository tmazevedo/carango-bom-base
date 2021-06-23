import React, { useEffect, useState } from 'react';
import Forms from '../../../sharedComponents/forms/forms';
import { Container } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import "./createVehicleComponent.scss";


function validateCar() {
    return { valido: true, text: "" }
}

function onSubmit(value) {
    // TO-DO Insert a request, need to create service from vehicle.
    console.log(value)
}

function CreateVehicleComponent() {

    return (
        <Container component="article" maxWidth="sm">
            <h1>Cadastrar Veículo</h1>

            <FormControl variant="outlined" size="medium" >
                <InputLabel id="demo-simple-select-outlined-label" >Marca</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={age}
                    className="formControl"
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Forms onSubmit={onSubmit}
                labelField1="Modelo"
                labelField2="Ano"
                labelField3="Valor"
                validation={validateCar}
                type="">
            </Forms>
        </Container>
    );

}


export default CreateVehicleComponent;