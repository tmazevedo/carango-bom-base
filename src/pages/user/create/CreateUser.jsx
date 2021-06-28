import React from "react";
import Forms from "../../../components/forms/forms";

function onSubmit(value) {
  // TO-DO Insert a request, need to create service from user.
  console.log(value);
}

const CreateUser = ({ changePageTitle }) => {
  // TODO
  changePageTitle("Criar usuário");

  return (
    <>
      <Forms
        mainButton={{
          text: "Salvar",
          onSubmit,
        }}
        fields={[
          { name: "usuario", label: "Usuário", required: true },
          { name: "senha", label: "Senha", required: true, type: "password" },
          {
            name: "senha-confirmar",
            label: "Confirmar senha",
            required: true,
            type: "password",
          },
        ]}
      />
    </>
  );
};

export default CreateUser;
