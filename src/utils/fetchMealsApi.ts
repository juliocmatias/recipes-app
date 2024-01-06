import { DataMealsType } from '../types';
import { dataProcessing } from './dataProcessing';

const alertError = "Sorry, we haven't found any recipes for these filters";
const errorNull = 'meals key returned null';
export const fetchMealsIngredient = async (ingredient: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data: DataMealsType = await response.json();
    if (data.meals === null) {
      throw new Error(errorNull);
    }

    const meals = dataProcessing(data.meals, 'meals');

    return meals;
  } catch (error) {
    console.log('Erro found when searching for Ingredient', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchMealsName = async (name: string) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    );
    const data: DataMealsType = await response.json();
    if (data.meals === null) {
      throw new Error(errorNull);
    }
    const meals = dataProcessing(data.meals, 'meals');

    return meals;
  } catch (error) {
    console.log('Erro found when searching for Name', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchMealsFirstLetter = async (firstLetter: string) => {
  if (firstLetter.length > 1) {
    window.alert('Your search must have only 1 (one) character');
    return null;
  }
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`,
    );
    const data: DataMealsType = await response.json();
    if (data.meals === null) {
      throw new Error(errorNull);
    }
    const meals = dataProcessing(data.meals, 'meals');

    return meals;
  } catch (error) {
    console.log('Erro found when searching for FirstLetter', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchMealsRecommendation = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data: DataMealsType = await response.json();
    if (data.meals === null) {
      throw new Error(errorNull);
    }
    const meals = dataProcessing(data.meals, 'meals');
    const limitedMeals = meals?.slice(0, 12);
    return limitedMeals;
  } catch (error) {
    console.log('Error when searching for recommended', error);
    return null;
  }
};

export const fetchMealsByCategory = async (category: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();

    const meals = dataProcessing(data.meals, 'meals');

    const limitedMeals = meals?.slice(0, 12);
    return limitedMeals;
  } catch (error) {
    console.log('There was an error in the Meals API by category', error);
  }
};

export const fetchMealsDetails = async (id: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    const meals = dataProcessing(data.meals, 'meals');

    return meals;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
};
