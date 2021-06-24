import React, { useEffect, useState } from "react";
import Forms from "../../../components/forms/forms";
import {
  Container,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function validateCar() {
  return { valido: true, text: "" };
}

function onSubmit(value) {
  // TO-DO Insert a request, need to create service from vehicle.
  console.log(value);
}

const CreateVehicle = () => {
  return (
    <>
      <Link className="link" to="/veiculos">
        <Button className="custom-button" variant="outlined" type="submit">
          Voltar
        </Button>
      </Link>

      <FormControl fullWidth variant="outlined" size="medium">
        <InputLabel id="demo-simple-select-outlined-label">Marca</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={age}
          label="Age"
        >
          <MenuItem value="" className="select-item">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Forms
        onSubmit={onSubmit}
        labelField1="Modelo"
        labelField2="Ano"
        labelField3="Valor"
        validation={validateCar}
        type=""
      ></Forms>
    </>
  );
};

export default CreateVehicle;
