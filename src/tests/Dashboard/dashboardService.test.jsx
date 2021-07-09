import DashboardService from '../../services/DashboardService';

jest.mock('../../services/DashboardService');

describe('should get all cars by brand from backend', () => {
  beforeEach(() => {
    DashboardService.List.mockResolvedValue([
      {
        brand: 'Fiat',
        totalPrice: 1010.00,
        count: 1,
      },
      {
        brand: 'Ford 2',
        totalPrice: 2020.00,
        count: 1,
      }]);
  });

  it('List from backend is not empty', async () => {
    const result = await DashboardService.List();
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          count: expect.any(Number),
          brand: expect.any(String),
          totalPrice: expect.any(Number),
        }),
      ]),
    );
  });
});
