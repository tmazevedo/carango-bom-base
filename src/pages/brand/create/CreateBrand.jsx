import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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
  },
}));

const CreateBrand = ({ changePageTitle }) => {
  // TODO
  changePageTitle("Criar marca");

  const [brand, setBrand] = useState("");
  const classes = useStyles();

  return (
    <>
      <Link className="link" to="/marcas">
        <Button variant="outlined" type="submit">
          Voltar
        </Button>
      </Link>

      <form>
        <TextField
          value={brand}
          onChange={(evt) => setBrand(evt.target.value)}
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
          <Button variant="outlined" color="primary" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBrand;
