const url = 'https://carango-bom-api-base.herokuapp.com/';
const LoginService = {
    auth(user, password) {
        return fetch(url + 'auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: password,
            }),
        }).then(r => r.json());
    },
};

export default LoginService;
