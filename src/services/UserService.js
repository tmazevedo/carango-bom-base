const token = localStorage.getItem('token');

const UserService = {
  List() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  FindById(id) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}users/${id}`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
      body: objectToChange,
    }).then((r) => r.json());
  },

};

export default UserService;
