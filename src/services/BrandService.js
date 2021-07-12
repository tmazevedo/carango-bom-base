import getToken from './TokenUtils';

const BrandService = {
  List() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}brands`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((r) => r.json());
  },
  Save(objectToSave) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}brands`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(objectToSave),
    }).then((r) => r.json());
  },
  FindById(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}brands/${id}`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((r) => r.json());
  },
  UpdateBrand(objectToChange, id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}brands/${id}`, {
      method: 'PUT',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: objectToChange,
    }).then((r) => r.json());
  },
  Remove(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}brands/${id}`, {
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default BrandService;
