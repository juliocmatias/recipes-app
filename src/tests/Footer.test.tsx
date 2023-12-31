import { screen, waitFor } from '@testing-library/dom';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouter from './helpers/renderWithRouter';

const footerId = 'footer';
const drinksButtonId = 'drinks-bottom-btn';
const mealsButtonId = 'meals-bottom-btn';

describe('14 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas', () => {
  it('O menu inferior existe e contém os ícones corretos', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );
    expect(screen.getByTestId(footerId)).toBeInTheDocument();

    const drinkButton = screen.getByTestId(drinksButtonId);

    expect(drinkButton.getAttribute('src')).toContain('drinkIcon');

    const mealButton = screen.getByTestId(mealsButtonId);

    expect(mealButton.getAttribute('src')).toContain('mealIcon');
  });

  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );

    expect(screen.getByTestId(footerId)).toBeInTheDocument();

    const footer = screen.getByTestId(footerId);

    expect(footer).toHaveStyle('position: fixed');
    expect(footer).toHaveStyle('bottom: 0');
  });
});

describe('15 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  const hasNoFooter = () => {
    expect(screen.queryByTestId(footerId)).not.toBeInTheDocument();
    expect(screen.queryByTestId(drinksButtonId)).not.toBeInTheDocument();
    expect(screen.queryByTestId(mealsButtonId)).not.toBeInTheDocument();
  };

  const hasFooter = () => {
    expect(screen.queryByTestId(footerId)).toBeInTheDocument();
    expect(screen.queryByTestId(drinksButtonId)).toBeInTheDocument();
    expect(screen.queryByTestId(mealsButtonId)).toBeInTheDocument();
  };

  it('Rota "/": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/' },
    );
    hasNoFooter();
  });

  it('Rota "/meals": deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );
    hasFooter();
  });

  it('Rota "/drinks": deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );
    hasFooter();
  });

  it('Rota "/meals/{id-da-receita}": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals/52771' },
    );
    hasNoFooter();
  });

  it('Rota "/drinks/{id-da-receita}": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks/178319' },
    );

    hasNoFooter();
  });

  it('Rota "/meals/{id-da-receita}/in-progress": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals/52771/in-progress' },
    );

    hasNoFooter();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks/178319/in-progress' },
    );

    hasNoFooter();
  });

  it('Rota "/profile": deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/profile' },
    );

    hasFooter();
  });

  it('Rota "/done-recipes": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/done-recipes' },
    );

    hasNoFooter();
  });

  it('Rota "/favorite-recipes": não deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/favorite-recipes' },
    );

    hasNoFooter();
  });
});

describe('16 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior', () => {
  it('Redireciona para a lista de bebidas ao clicar no ícone de bebidas', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );
    await user.click(screen.getByTestId(drinksButtonId));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks');
    });
  });

  it('Redireciona para a lista de comidas ao clicar no ícone de comidas', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );
    await user.click(screen.getByTestId(mealsButtonId));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals');
    });
  });
});
