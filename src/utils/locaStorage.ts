import { KeyLocalStorageType,
  RecipeLocalStorageType, UserLocalStorageType } from '../types';
// a função putLocalStorage é responsável por adicionar um item ao localStorage
// ela deverá receber chave e valor como parâmetros
// a chave pode ser favoriteRecipes ou doneRecipes
// o valor deve ser um objeto contendo as informações da receita

// cada objeto deverá conter, caso favoriteRecipes:
// id: id da receita
// type: comida ou bebida
// nationality: se for comida, a nacionalidade, se for bebida, vazio
// category: categoria da receita
// alcoholicOrNot: se for comida, vazio, se for bebida, alcoholic ou non-alcoholic
// name: nome da receita
// image: imagem da receita

// caso doneRecipes:
// id: id da receita
// type: comida ou bebida
// nationality: se for comida, a nacionalidade, se for bebida, vazio
// category: categoria da receita
// alcoholicOrNot: se for comida, vazio, se for bebida, alcoholic ou non-alcoholic
// name: nome da receita
// image: imagem da receita
// doneDate: data de conclusão
// tags: array tags da receita, caso não tenha, array vazio

// OBS: deve-se transformar o objeto no tipo RecipeLocalStorageType antes de chamar a função putLocalStorage.

export const putLocalStorage = (
  key: KeyLocalStorageType,

  value: RecipeLocalStorageType | UserLocalStorageType,
) => {
  switch (key) {
    case 'user': {
      localStorage.setItem('user', JSON.stringify(value));
      break; }
    case 'doneRecipes': {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, value]));
      break; }
    case 'favoriteRecipes': {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, value]));
      break; }
    default:
      return null;
  }
};

// a função getLocalStorage é responsável por buscar todos os itens salvos no localStorage;
// ela deverá retornar um objeto com as seguintes chaves:
// favoriteRecipes: array de objetos com as receitas favoritas
// doneRecipes: array de objetos com as receitas feitas

export const getLocalStorage = (key: KeyLocalStorageType) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from localStorage:', error);
    return null;
  }
};

// a função deleteLocalStorage é responsável por deletar um item do localStorage;
// ela deverá receber chave e id como parâmetros
// a chave pode ser favoriteRecipes ou doneRecipes
// o id é o id da receita

export const deleteLocalStorage = (key: KeyLocalStorageType, id?: string) => {
  switch (key) {
    case 'doneRecipes': {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      const newDoneRecipes = doneRecipes
        .filter((recipe: RecipeLocalStorageType) => recipe.id !== id);
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
      break; }
    case 'favoriteRecipes': {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe: RecipeLocalStorageType) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      break; }
    default:
      localStorage.clear();
  }
};
