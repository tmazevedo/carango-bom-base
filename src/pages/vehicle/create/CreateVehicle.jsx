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
            id: "marca", label: "Marca",
            componentType: "autocomplete",
            options: ['Volks', 'Peugeot', 'Xablau']
          },
          { id: "modelo", label: "Modelo" },
          { id: "valor", label: "Valor" }
        ]}
      ></Forms>
    </>
  );
};

export default CreateVehicle;
