const url = 'https://carango-bom-api-base.herokuapp.com/';
const LoginService = {
    auth(user, password) {
        return fetch(url + 'auth', {
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            body: JSON.stringify({
                username: user,
                password: password,
            }),
            mode: 'no-cors',
        }).then(r => r.json);
    },
    teste() {
        return fetch(url + 'cars', {
            mode: 'no-cors',
        }).then(r => r.json);
    },
};

export default LoginService;
