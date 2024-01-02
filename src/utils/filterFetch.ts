import { TypeSearch } from '../types';
import { fetchDrinksFirstLetter,
  fetchDrinksIngredient, fetchDrinksName,
  fetchDrinksRecommendation } from './fetchDrinksApi';
import { fetchMealsFirstLetter,
  fetchMealsIngredient, fetchMealsName, fetchMealsRecommendation } from './fetchMealsApi';

export default async function filterFetch(
  namePage: string,
  typeSearch: TypeSearch,
  value?: string,
) {
  switch (typeSearch) {
    case 'ingredient':
      if (namePage === 'meals') {
        return fetchMealsIngredient(value || '');
      }
      return fetchDrinksIngredient(value || '');
    case 'name':
      if (namePage === 'meals') {
        return fetchMealsName(value || '');
      }
      return fetchDrinksName(value || '');
    case 'first-letter':
      if (namePage === 'meals') {
        return fetchMealsFirstLetter(value || '');
      }
      return fetchDrinksFirstLetter(value || '');
    case 'recommendation':

      if (namePage === 'meals') {
        return fetchMealsRecommendation();
      }
      return fetchDrinksRecommendation();
    default:
      return null;
  }
}
