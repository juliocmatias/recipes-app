import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import { mealsNotFound } from './mocks/mockMeals/mealsNotFound';
import { drinksNotFound } from './mocks/mockDrinks/drinksNotFound';
import { fetchMock } from './mocks/fetchMock';
import { beefMeals } from './mocks/mockMeals/beefMeals';
import { shake } from './mocks/mockDrinks/shake';
import { drinksRecommendation } from './mocks/mockDrinks/drinksRecommendation';
import { mealsRecommendation } from './mocks/mockMeals/mealsRecommendation';

const buttonBeef = 'Beef-category-filter';
const buttonShake = 'Shake-category-filter';

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

describe('18 - Verifica se quando clicado em uma categoria de filtro tem o retorno da api corretamente', () => {
  const checkFirstTwelveRecipes = (recipes: any, meal = true) => {
    const recipeType = meal ? 'Meal' : 'Drink';
    recipes.slice(0, 12).forEach((recipe: any, index: number) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)
        .getAttribute('src')).toContain(recipe[`str${recipeType}Thumb`]);
      expect(screen.getByTestId(`${index}-card-name`)).toContainHTML(recipe[`str${recipeType}`]);
    });
    expect(screen.queryByTestId('12-recipe-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('12-card-img')).not.toBeInTheDocument();
    expect(screen.queryByTestId('12-card-name')).not.toBeInTheDocument();
  };

  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
  });
  it('Verifica se na pagina de /meals tem apenas 12 retorno recipes quando clicado em filtro Beef', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );

    const ButtonFilterBeef = screen.findByTestId(buttonBeef);

    await user.click(await ButtonFilterBeef);

    checkFirstTwelveRecipes(beefMeals.meals);
  });

  it('Verifica se na pagina de /drinks tem apenas 12 retorno recipes quando clicado em filtro Cocktail', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const ButtonFilterShake = screen.findByTestId(buttonShake);

    await user.click(await ButtonFilterShake);

    checkFirstTwelveRecipes(shake.drinks, false);
  });

  it('Verifica se na pagina de /drinks quando clicado em filtro All volta ao a exibir os 12 recipes recomendados', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const ButtonFilterShake = screen.findByTestId(buttonShake);

    await user.click(await ButtonFilterShake);

    checkFirstTwelveRecipes(shake.drinks, false);

    const ButtonFilterAll = screen.findByTestId('All-category-filter');

    await user.click(await ButtonFilterAll);

    checkFirstTwelveRecipes(drinksRecommendation.drinks, false);
  });

  it('Verifica se na pagina de /meals quando clicado em filtro All volta ao a exibir os 12 recipes recomendados', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );

    const ButtonFilterBeef = screen.findByTestId(buttonBeef);

    await user.click(await ButtonFilterBeef);

    checkFirstTwelveRecipes(beefMeals.meals);

    const ButtonFilterAll = screen.findByTestId('All-category-filter');

    await user.click(await ButtonFilterAll);

    checkFirstTwelveRecipes(mealsRecommendation.meals);
  });

  it('Verifica na pagina de /meals quando clicado 2 vezes em um filtro, deverá voltar ao recipes recomendados', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );

    const ButtonFilterBeef = screen.findByTestId(buttonBeef);

    await user.click(await ButtonFilterBeef);

    checkFirstTwelveRecipes(beefMeals.meals);

    await user.click(await ButtonFilterBeef);

    checkFirstTwelveRecipes(mealsRecommendation.meals);
  });

  it('Verifica na pagina de /drinks quando clicado 2 vezes em um filtro, deverá voltar ao recipes recomendados', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const ButtonFilterShake = screen.findByTestId(buttonShake);

    await user.click(await ButtonFilterShake);

    checkFirstTwelveRecipes(shake.drinks, false);

    await user.click(await ButtonFilterShake);

    checkFirstTwelveRecipes(drinksRecommendation.drinks, false);
  });
});
