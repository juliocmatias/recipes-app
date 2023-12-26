import { act, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

const buttonSearchID = 'search-top-btn';
const buttonProfileID = 'profile-top-btn';
const inputSearchID = 'search-input';
const pageTitleID = 'page-title';

describe('6 - Implemente o header de acordo com a necessidade de cada tela', () => {
  const hasNoHeader = () => {
    expect(screen.queryByTestId(buttonProfileID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(pageTitleID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(buttonSearchID)).not.toBeInTheDocument();
  };

  const hasHeader = (title: string, withSearchButton = true) => {
    const profileButton = screen.getByTestId(buttonProfileID);

    expect(profileButton.getAttribute('src')).toContain('profileIcon');

    expect(screen.getByTestId(pageTitleID)).toHaveTextContent(title);

    if (withSearchButton) {
      const searchButton = screen.getByTestId(buttonSearchID);
      expect(searchButton.getAttribute('src')).toContain('searchIcon');
    } else {
      expect(screen.queryByTestId(buttonSearchID)).not.toBeInTheDocument();
    }
  };

  it('Rota "/": não possui header', async () => {
    renderWithRouter(
      <RecipesProvider>

        <App />
      </RecipesProvider>,
      { route: '/' },
    );

    hasNoHeader();
  });

  it('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals' },
    );

    hasHeader('Meals');
  });

  it('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', async () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/drinks' },
    );

    hasHeader('Drinks');
  });

  it('Rota "/meals/{id-da-receita}": não possui header', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals/52771' },
    );
    hasNoHeader();
  });

  it('Rota "drinks/{id-da-receita}": não possui header', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/drinks/178319' },
    );
    hasNoHeader();
  });

  it('Rota "/meals/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals/52771/in-progress' },
    );
    hasNoHeader();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/drinks/178319/in-progress' },
    );
    hasNoHeader();
  });

  it('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/profile' },
    );
    hasHeader('Profile', false);
  });

  it('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/done-recipes' },
    );
    hasHeader('Done Recipes', false);
  });

  it('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/favorite-recipes' },
    );
    hasHeader('Favorite Recipes', false);
  });
});

describe('7 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals' },
    );

    expect(screen.getByTestId(pageTitleID)).toHaveTextContent('Meals');

    const profileButton = screen.getByTestId(buttonProfileID);
    await act(async () => {
      await user.click(profileButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId(pageTitleID)).toHaveTextContent('Profile');
    });
  });
});

describe('8 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca, a barra de busca deve aparecer', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals' },
    );

    expect(screen.queryByTestId(inputSearchID)).not.toBeInTheDocument();

    const searchButton = screen.getByTestId(buttonSearchID);
    await act(async () => {
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId(inputSearchID)).toBeInTheDocument();
    });
  });

  it('Ao clicar no botão de busca novamente, a barra de busca deve sumir', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
      { route: '/meals' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId(inputSearchID)).toBeInTheDocument();
    });

    await act(async () => {
      await user.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId(inputSearchID)).not.toBeInTheDocument();
    });
  });
});
