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
};

export default BrandService;
