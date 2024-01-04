import { drinksNotFound } from './mockDrinks/drinksNotFound';
import { oneDrinkFoundAquamarine } from './mockDrinks/oneDrinkFoundAquamarine';
import { drinksFirstLetter } from './mockDrinks/drinksFirstLetter';
import { drinksIngredients } from './mockDrinks/drinksIngredients';
import { drinksName } from './mockDrinks/drinksName';
import { oneMealFoundArrabiata } from './mockMeals/oneMealFoundArrabiata';
import { mealsFirstLetter } from './mockMeals/mealsFirstLetter';
import { mealsIngredients } from './mockMeals/mealsIngredients';
import { mealsName } from './mockMeals/mealsName';
import { mealsNotFound } from './mockMeals/mealsNotFound';
import { mealsRecommendation } from './mockMeals/mealsRecommendation';
import { drinksRecommendation } from './mockDrinks/drinksRecommendation';
import { beefMeals } from './mockMeals/beefMeals';
import { cocktail } from './mockDrinks/cocktail';
import { shake } from './mockDrinks/shake';
import { other } from './mockDrinks/other';

const POSSIBLE_RESPONSES: any = {
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon': drinksIngredients,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin': drinksName,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a': drinksFirstLetter,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken': mealsIngredients,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=soup': mealsName,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=a': mealsFirstLetter,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata': oneMealFoundArrabiata,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine': oneDrinkFoundAquamarine,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau': drinksNotFound,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=xablau': drinksNotFound,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=.': drinksNotFound,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau': mealsNotFound,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=xablau': mealsNotFound,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=.': mealsNotFound,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': mealsRecommendation,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinksRecommendation,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': cocktail,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake': shake,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other%20/%20Unknown': other,
};

export const fetchMock = async (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: async () => (POSSIBLE_RESPONSES[url] ? POSSIBLE_RESPONSES[url] : null),
});
