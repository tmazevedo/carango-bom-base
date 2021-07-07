const AuthService = {
  verifyToken: async (token) => {
    const result = await fetch(`${process.env.REACT_APP_SERVER_URL}auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const response = await result.json();
    return result.status === 200 && response.valid;
  },
};

export default AuthService;
