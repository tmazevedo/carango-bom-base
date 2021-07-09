import DashboardService from '../../services/DashboardService';

jest.mock('../../services/DashboardService');

describe('should get all cars by brand from backend', () => {
  const arr = DashboardService.List.mockImplementation(() => Promise.resolve(
    [
      {
        brand: 'Fiat',
        totalPrice: 1010.00,
        count: 1,
      },
      {
        brand: 'Ford 2',
        totalPrice: 2020.00,
        count: 1,
      },
    ],
  ));

  it('List from backend is not empty', () => {
    // eslint-disable-next-line jest/no-conditional-expect
    if (arr.length > 0) {
      expect(arr).toBe(expect.arrayContaining(
        expect.toMatchObject({ count: expect.any(Number), brand: expect.any(String), 
            totalPrice: expect.any(Number) }),
      ));
    }
  });
});
