const token = localStorage.getItem('token');

const VehicleService = {
    List() {
        return fetch(process.env.REACT_APP_SERVER_URL + 'cars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        }).then(r => r.json());
    },
    Save(objectToSave) {
        return fetch(process.env.REACT_APP_SERVER_URL + 'cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.token,
            },
            body: JSON.stringify(objectToSave),
        }).then(r => r.json());
    },
};

export default VehicleService;
