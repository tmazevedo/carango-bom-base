import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('should get all brands from backend', () => {
  beforeEach(() => {
    BrandService.List.mockResolvedValue([
      { id: 1, name: 'Ford' },
      { id: 2, name: 'Fiat' },
      { id: 3, name: 'Volvo' },
      { id: 4, name: 'Porshe' },
    ]);
  });

  it('List from backend is not empty', async () => {
    const result = await BrandService.List();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
