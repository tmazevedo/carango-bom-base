const token = localStorage.getItem('token');

const VehicleService = {
  List() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}cars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());
  },
  Save(objectToSave) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}cars`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(objectToSave),
    }).then((r) => r.json());
  },
  FindById(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}cars/${id}`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  UpdateVehicle(objectToChange, id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}cars/${id}`, {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(objectToChange),
    }).then((r) => r.json());
  },
};

export default VehicleService;
