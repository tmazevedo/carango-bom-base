import BrandService from '../../services/BrandService';

jest.mock('../../services/BrandService');

describe('should get all brands from backend', () => {
  const arr = BrandService.List.mockImplementation(() => Promise.resolve(
    { id: 1, name: 'Ford' },
    { id: 2, name: 'Fiat' },
    { id: 3, name: 'Volvo' },
    { id: 4, name: 'Porshe' },
  ));

  it('List from backend is not empty', () => {
    if (arr.length > 0) {
      expect(arr).toBe(expect.arrayContaining(
        expect.toMatchObject({ id: expect.any(Number), name: expect.any(String) }),
      ));
    }
  });
});
