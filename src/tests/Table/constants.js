const vehicleTable = {
  columns: [
    { field: 'marca', headerName: 'Marca', width: 200 },
    { field: 'modelo', headerName: 'Modelo', width: 200 },
    { field: 'ano', headerName: 'Ano', width: 200 },
    { field: 'valor', headerName: 'Valor', width: 200 },
    { field: 'valorTeste', headerName: 'ValorTeste', width: 200 },
  ],
  fields: [
    {
      id: '9', marca: 'Ford', modelo: 'Ka', ano: 2020, valor: 40000,
    },
    {
      id: '10', marca: 'Ford', modelo: 'Ranger', ano: 2021, valor: 245000,
    },
  ],
};

const userTable = {
  columns: [
    { field: 'nome', headerName: 'Nome', width: 200 },
  ],
  fields: [
    { id: '10', nome: 'teste' },
    { id: '1', nome: 'teste' },
  ],
};

const brandTable = {
  columns: [
    { field: 'brand', headerName: 'Marca', width: 200 },
  ],
  fields: [
    { id: '9', brand: 'teste' },
    { id: '10', brand: 'teste' },
    { id: '11', brand: 'teste' },
  ],
};

export {
  vehicleTable,
  userTable,
  brandTable,
};
