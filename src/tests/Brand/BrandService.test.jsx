import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('should get all brands from backend', () => {
  BrandService.List.mockResolvedValue([
    { id: 1, name: 'Ford' },
    { id: 2, name: 'Fiat' },
    { id: 3, name: 'Volvo' },
    { id: 4, name: 'Porshe' },
  ]);

  it('List from backend is not empty', () => {
    const expected = {
      id: expect.any(Number),
      name: expect.any(String),
    };
    const result = BrandService.List();
    expect(result).toBe(
      expect.arrayContaining(
        expect.toMatchObject(expected),
      ),
    );
  });
});
