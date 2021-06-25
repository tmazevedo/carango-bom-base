import React from "react";
import Forms from '../../components/forms/forms'

const LoginPage = () => {
  function onSubmit(value) {
    console.log(value)
  }

  return (
    <Forms
      mainButton={{
        text: "Login",
        onSubmit
      }}
      secondaryButton={{
        text: "Recuperar senha",
        onSubmit
      }}
      fields={[
        { id: "usuario", label: "Usuário", required: true },
        { id: "senha", label: "Senha", type: "password", required: true }
      ]}
    />
  );
};

export default LoginPage;
