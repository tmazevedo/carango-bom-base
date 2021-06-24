import React, { useEffect, useState } from 'react';
import Forms from '../../../components/forms/forms';
import { Container } from '@material-ui/core';


function validatePassword(password, validatePassword) {
    if (password === validatePassword) {
        return { valido: true, text: "" }
    } else {
        return { valido: false, text: "Passwords must be the same" }
    }
}

function onSubmit(value) {
    // TO-DO Insert a request, need to create service from user.
    console.log(value)
  }

function CreateUserComponent() {

    return (
        <Container component="article" maxWidth="sm">
            <h1>Cadastrar Usuario</h1>
            <Forms onSubmit={onSubmit}
                labelField1="Usuario"
                labelField2="Senha"
                labelField3="Confirmação Senha"
                validation={validatePassword}
                type="password">
            </Forms>
        </Container>
    );

}



export default CreateUserComponent;