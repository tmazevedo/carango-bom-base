const token = localStorage.getItem('token');

const UserService = {
    List() {
        return fetch(process.env.REACT_APP_SERVER_URL + 'users', {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(r => r.json());
    },
    Save(username, password) {
        return fetch(process.env.REACT_APP_SERVER_URL + 'users', {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(r => r.json());
    },

};

export default UserService;
