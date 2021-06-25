import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const LoginPage = () => {
  return (
    <>
      <form autoComplete="off">
        <TextField
          label="Usuário"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
        />
        <TextField
          label="Senha"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
        />
      </form>
      <div>
        <Button className="action-item">Recuperar senha</Button>
      </div>
      <div className="action-itens">
        <Button className="action-item" variant="outlined" color="primary">
          Entrar
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
