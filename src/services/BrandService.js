const token = localStorage.getItem('token');

const BrandService = {
    List() {
        return fetch(process.env.REACT_APP_SERVER_URL + 'brands', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(r => r.json());
    },
    Save(objectToSave) {
        return fetch(process.env.REACT_APP_SERVER_URL + 'brands', {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(objectToSave),
        }).then(r => r.json());
    },
    FindById(id) {
        return fetch(process.env.REACT_APP_SERVER_URL + 'brands/' + id, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(r => r.json());
    },
    UpdateUser(objectToChange, id) {
        return fetch(process.env.REACT_APP_SERVER_URL + 'brands/' + id, {
            method: 'PUT',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: objectToChange,
        }).then(r => r.json());
    },
};

export default BrandService;
