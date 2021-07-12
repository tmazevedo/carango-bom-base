import getToken from './TokenUtils';

const UserService = {
  List() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((r) => r.json());
  },
  Save(username, password) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((r) => r.json());
  },
  Remove(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users/${id}`, {
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  FindById(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users/${id}`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((r) => r.json());
  },
  UpdateUser(objectToChange, id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users/${id}`, {
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

};

export default UserService;
