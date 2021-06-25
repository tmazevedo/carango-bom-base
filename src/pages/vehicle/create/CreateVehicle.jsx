import React from "react";
import Forms from "../../../components/forms/forms";

function onSubmit(value) {
  // TO-DO Insert a request, need to create service from vehicle.
  console.log(value);
}

const CreateVehicle = () => {
  return (
    <>
      <Forms
        mainButton={{
          text: "Salvar",
          onSubmit
        }}
        fields={[
          {
            name: "marca", label: "Marca",
            componentType: "autocomplete",
            options: ['Volks', 'Peugeot', 'Xablau'],
            required: true
          },
          { name: "modelo", label: "Modelo", required: true },
          { name: "valor", label: "Valor", required: true }
        ]}
      />
    </>
  );
};

export default CreateVehicle;
