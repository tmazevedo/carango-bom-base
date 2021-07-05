const LoginService = {
    async auth(user, password) {
        const result = await fetch(process.env.REACT_APP_SERVER_URL + 'auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: password,
            }),
        });

        return result;
    },
};

export default LoginService;
