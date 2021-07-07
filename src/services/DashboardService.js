const token = localStorage.getItem('token');

const DashboardService = {
  List() {
    return fetch(`${process.env.REACT_APP_SERVER_URL}dashboard/cars-by-brand`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
};

export default DashboardService;
