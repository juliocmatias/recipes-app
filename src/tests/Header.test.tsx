import { act, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const buttonSearchID = 'search-top-btn';

describe('6 - Implemente o header de acordo com a necessidade de cada tela', () => {
  const hasNoHeader = () => {
    expect(screen.queryByTestId('profile-top-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId(buttonSearchID)).not.toBeInTheDocument();
  };

  const hasHeader = (title: string, withSearchButton = true) => {
    const profileButton = screen.getByTestId('profile-top-btn');

    expect(profileButton.getAttribute('src')).toContain('profileIcon');

    expect(screen.getByTestId('page-title')).toHaveTextContent(title);

    if (withSearchButton) {
      const searchButton = screen.getByTestId(buttonSearchID);
      expect(searchButton.getAttribute('src')).toContain('searchIcon');
    } else {
      expect(screen.queryByTestId(buttonSearchID)).not.toBeInTheDocument();
    }
  };

  it('Rota "/": não possui header', async () => {
    renderWithRouter(<App />, { route: '/' });

    hasNoHeader();
  });

  it('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    hasHeader('Meals');
  });

  it('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', async () => {
    renderWithRouter(<App />, { route: '/drinks' });

    hasHeader('Drinks');
  });

  it('Rota "/meals/{id-da-receita}": não possui header', () => {
    renderWithRouter(<App />, { route: '/meals/52771' });
    hasNoHeader();
  });

  it('Rota "drinks/{id-da-receita}": não possui header', () => {
    renderWithRouter(<App />, { route: '/drinks/178319' });
    hasNoHeader();
  });

  it('Rota "/meals/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouter(<App />, { route: '/meals/52771/in-progress' });
    hasNoHeader();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não possui header', () => {
    renderWithRouter(<App />, { route: '/drinks/178319/in-progress' });
    hasNoHeader();
  });

  it('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(<App />, { route: '/profile' });
    hasHeader('Profile', false);
  });

  it('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    hasHeader('Done Recipes', false);
  });

  it('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    hasHeader('Favorite Recipes', false);
  });
});
