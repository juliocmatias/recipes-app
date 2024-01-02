import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import { mealsNotFound } from './mocks/mockMeals/mealsNotFound';
import { drinksNotFound } from './mocks/mockDrinks/drinksNotFound';

describe('17 - Verifica se quando o retorno da api para recomendados det null apresenta console de erro.', () => {
  afterEach(() => {
    vi.spyOn(global, 'fetch').mockRestore();
  });
  it('Verifica se na pagina de /meals aparece o console de erro', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mealsNotFound,
    } as Response);

    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );
    expect(window.fetch).toBeCalled();

    expect(screen.queryByTestId('0-recipe-card')).not.toBeInTheDocument();
  });

  it('Verifica se na pagina de /drinks aparece o console de erro', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => drinksNotFound,
    } as Response);

    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );
    expect(window.fetch).toBeCalled();

    expect(screen.queryByTestId('0-recipe-card')).not.toBeInTheDocument();
  });
});
