const vehicleTable = {
    columns: [
        { field: 'marca', headerName: 'Marca', width: 200 },
        { field: 'modelo', headerName: 'Modelo', width: 200 },
        { field: 'ano', headerName: 'Ano', width: 200 },
        { field: 'valor', headerName: 'Valor', width: 200 },
    ],
    fields: [
        {
            id: '10', marca: 'teste', modelo: 'teste', ano: 'teste', valor: 'teste',
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
        { id: '10', brand: 'teste' },
    ],
};

export {
    vehicleTable,
    userTable,
    brandTable,
};
