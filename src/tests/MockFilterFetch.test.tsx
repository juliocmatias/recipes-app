import filterFetch from '../utils/filterFetch';

describe('Testa a função filterFetch', () => {
  it('Testa se a função retorna null quando passado um typeSearch de drinks default', async () => {
    const result = await filterFetch('drinks', 'default', 'value');
    expect(result).toBeNull();
  });
});
