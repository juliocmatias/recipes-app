import { act, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import { fetchMock } from './mocks/fetchMock';

const buttonSearchID = 'search-top-btn';
const inputSearchID = 'search-input';
const radioIngredientID = 'ingredient-search-radio';
const radioNameID = 'name-search-radio';
const radioFirstLetterID = 'first-letter-search-radio';
const exeButtonID = 'exec-search-btn';

const alertNotFound = "Sorry, we haven't found any recipes for these filters";

describe('9 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', async () => {
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
      expect(screen.getByTestId(radioIngredientID)).toBeInTheDocument();
      expect(screen.getByTestId(radioNameID)).toBeInTheDocument();
      expect(screen.getByTestId(radioFirstLetterID)).toBeInTheDocument();
      expect(screen.getByTestId(exeButtonID)).toBeInTheDocument();
    });
  });
});

describe('10 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
    vi.spyOn(window, 'alert');
  });
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
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

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'chicken');
      await user.click(screen.getByTestId(radioIngredientID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
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

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'soup');
      await user.click(screen.getByTestId(radioNameID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async () => {
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

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'a');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
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

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'abc');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

describe('11 - Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
    vi.spyOn(window, 'alert');
  });
  it('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'lemon');
      await user.click(screen.getByTestId(radioIngredientID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
  });

  it('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'gin');
      await user.click(screen.getByTestId(radioNameID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'a');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'abc');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

describe('12 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
  });
  it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/meals' },
    );

    await user.click(screen.getByTestId(buttonSearchID));

    await user.type(screen.getByTestId(inputSearchID), 'Arrabiata');
    await user.click(screen.getByTestId(radioNameID));
    await user.click(screen.getByTestId(exeButtonID));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52771');
    });
  });

  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    await user.click(screen.getByTestId(buttonSearchID));
    await user.type(screen.getByTestId(inputSearchID), 'Aquamarine');
    await user.click(screen.getByTestId(radioNameID));
    await user.click(screen.getByTestId(exeButtonID));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/178319');
    });
  });
});

describe('13 - Exiba um `alert` caso nenhuma receita seja encontrada', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
    vi.spyOn(window, 'alert');
  });
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido', async () => {
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

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'xablau');
      await user.click(screen.getByTestId(radioNameID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'xablau');
      await user.click(screen.getByTestId(radioIngredientID));
    });

    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), '.');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });

    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);
  });

  it('Caso nenhuma bebida seja encontrada o alert deve ser exibido', async () => {
    const { user } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,

      { route: '/drinks' },
    );

    const searchButton = screen.getByTestId(buttonSearchID);

    await act(async () => {
      await user.click(searchButton);
    });

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'xablau');
      await user.click(screen.getByTestId(radioNameID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), 'xablau');
      await user.click(screen.getByTestId(radioIngredientID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);

    await act(async () => {
      await user.type(screen.getByTestId(inputSearchID), '.');
      await user.click(screen.getByTestId(radioFirstLetterID));
    });
    await user.click(screen.getByTestId(exeButtonID));
    expect(window.alert).toHaveBeenCalledWith(alertNotFound);
  });
});

describe('14 - Exiba um `alert` caso mais nada seja digitado no input de busca', () => {
  beforeEach(() => {
    vi.spyOn(window, 'fetch').mockImplementation(fetchMock as any);
    vi.spyOn(window, 'alert');
  });
  it('Caso o input de busca esteja vazio o alert deve ser exibido', async () => {
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
    await act(async () => {
      await user.click(screen.getByTestId(exeButtonID));
    });
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('Your search must contain only 1 (one) character');
  });
});
