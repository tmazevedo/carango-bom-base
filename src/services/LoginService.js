const LoginService = {
  async auth(user, password) {
    // eslint-disable-next-line
        const response = await fetch(process.env.REACT_APP_SERVER_URL + 'auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password,
      }),
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error('Usuário ou senha inválida!');
  },
};

export default LoginService;
