import { DataMealsType } from '../types';

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
    return data.meals;
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
    return data.meals;
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
    return data.meals;
  } catch (error) {
    console.log('Erro found when searching for FirstLetter', error);
    window.alert(alertError);
    return null;
  }
};

export const fetchMealsRecommendation = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Erro busca de recomendados', error);
  }
};

export const fetchMealsDetails = async (id: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0];

      meal.ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
          meal.ingredients.push(`${ingredient} - ${measure}`);
        }
      }

      return { meals: [meal] };
    }
    return { meals: [] };
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return { meals: [] };
  }
};

export const fetchMealsByCategory = async (category: string) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Deu erro na API de Meals por categoria', error);
  }
};
