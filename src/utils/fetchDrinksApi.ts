import { DataDrinksType } from '../types';

const alertError = "Sorry, we haven't found any recipes for these filters";
const errorNull = 'drinks key returned null';

export const fetchDrinksIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data: DataDrinksType = await response.json();
    if (data.drinks === null) {
      throw new Error(errorNull);
    }
    return data.drinks;
  } catch (error) {
    console.log('Erro found when searching for Ingredient', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchDrinksName = async (name: string) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    );
    const data: DataDrinksType = await response.json();
    if (data.drinks === null) {
      throw new Error(errorNull);
    }
    return data.drinks;
  } catch (error) {
    console.log('Erro found when searching for Name', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchDrinksFirstLetter = async (firstLetter: string) => {
  if (firstLetter.length > 1) {
    window.alert('Your search must have only 1 (one) character');
    return null;
  }
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`,
    );
    const data: DataDrinksType = await response.json();
    if (data.drinks === null) {
      throw new Error(errorNull);
    }
    return data.drinks;
  } catch (error) {
    console.log('Erro found when searching for FirstLetter', error);
    window.alert(alertError);
    return null;
  }
};

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const fetchDrinksDetails = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}lookup.php?i=${id}`);
    const data = await response.json();

    if (data.drinks && data.drinks.length > 0) {
      const drink = data.drinks[0];
      const ingredients = [];

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient && measure) {
          ingredients.push(`${ingredient} - ${measure}`);
        } else if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      drink.ingredients = ingredients;

      drink.containsAlcoholic = drink.strAlcoholic === 'Alcoholic';
    }

    return data;
  } catch (error) {
    console.error('Error fetching drink details:', error);
    return {};
  }
};

export const fetchDrinksByCategory = async (category: string) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Deu erro na API de Drinks por categoria', error);
  }
};
