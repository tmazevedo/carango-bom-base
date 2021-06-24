import React, { useEffect, useState } from "react";
import Forms from "../../../components/forms/forms";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function validatePassword(password, validatePassword) {
  if (password === validatePassword) {
    return { valido: true, text: "" };
  } else {
    return { valido: false, text: "Passwords must be the same" };
  }
}

function onSubmit(value) {
  // TO-DO Insert a request, need to create service from user.
  console.log(value);
}

const CreateUser = () => {
  return (
    <>
      <Link className="link" to="/usuarios">
        <Button className="custom-button" variant="outlined" type="submit">
          Voltar
        </Button>
      </Link>
      <Forms
        onSubmit={onSubmit}
        labelField1="Usuário"
        labelField2="Senha"
        labelField3="Confirmar senha"
        validation={validatePassword}
        type="password"
      ></Forms>
    </>
  )
}

export default CreateUser
