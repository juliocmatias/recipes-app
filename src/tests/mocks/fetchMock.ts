import { mockDrinksFirstLetter } from './mockDrinks/mockDrinksFirstLetter';
import { mockDrinksIngredients } from './mockDrinks/mockDrinksIngredients';
import { mockDrinksName } from './mockDrinks/mockDrinksName';
import { mockMealsFirstLetter } from './mockMeals/mockMealsFirstLetter';
import { mockMealsIngredients } from './mockMeals/mockMealsIngredients';
import { mockMealsName } from './mockMeals/mockMealsName';

const POSSIBLE_RESPONSES: any = {
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon': mockDrinksIngredients,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin': mockDrinksName,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a': mockDrinksFirstLetter,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken': mockMealsIngredients,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=soup': mockMealsName,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=a': mockMealsFirstLetter,
};

export const fetchMock = async (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSES[url] ? POSSIBLE_RESPONSES[url] : null),
});
