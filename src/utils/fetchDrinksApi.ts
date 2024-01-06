import { DataDrinksType } from '../types';
import { dataProcessing } from './dataProcessing';

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
    const drinks = dataProcessing(data.drinks, 'drinks');

    return drinks;
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

    const drinks = dataProcessing(data.drinks, 'drinks');

    return drinks;
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
    const drinks = dataProcessing(data.drinks, 'drinks');

    return drinks;
  } catch (error) {
    console.log('Erro found when searching for FirstLetter', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchDrinksRecommendation = async () => {
  try {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    );
    const data: DataDrinksType = await response.json();
    if (data.drinks === null) {
      throw new Error(errorNull);
    }
    const drinks = dataProcessing(data.drinks, 'drinks');
    const limitedDrinks = drinks?.slice(0, 12);
    return limitedDrinks;
  } catch (error) {
    console.log('Error when searching for recommended', error);
    return null;
  }
};

export const fetchDrinksByCategory = async (category: string) => {
  const newCategory = category === 'Other/Unknown' ? 'Other / Unknown' : category;
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${newCategory}`);
    const data: DataDrinksType = await response.json();

    const drinks = dataProcessing(data.drinks, 'drinks');

    const limitedDrinks = drinks?.slice(0, 12);
    return limitedDrinks;
  } catch (error) {
    console.log('There was an error in the Drinks API by category', error);
  }
};

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const fetchDrinksDetails = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}lookup.php?i=${id}`);
    const data: DataDrinksType = await response.json();

    const drinks = dataProcessing(data.drinks, 'drinks');

    return drinks;
  } catch (error) {
    console.error('Error fetching drink details:', error);
    return null;
  }
};
