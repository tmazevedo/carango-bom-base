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
        <div class="action-itens">
          <Button
            className="action-item"
            variant="outlined"
            color="primary"
            type="submit">
            Recuperar senha
          </Button>
          <Button
            className="action-item"
            variant="contained"
            color="primary"
            type="submit">
            Entrar
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
