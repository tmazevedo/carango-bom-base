import React from "react";
import Forms from "../../../components/forms/forms";

function onSubmit(value) {
  // TO-DO Insert a request, need to create service from user.
  console.log(value);
}

const CreateUser = () => {
  return (
    <>
      <Forms
        mainButton={{
          text: "Salvar",
          onSubmit
        }}
        fields={[
          { id: "usuario", label: "Usuário", required: true },
          { id: "senha", label: "Senha", required: true, type: "password" },
          { id: "senha-confirmar", label: "Confirmar senha", required: true, type: "password" }
        ]}
      ></Forms>
    </>
  )
}

export default CreateUser
