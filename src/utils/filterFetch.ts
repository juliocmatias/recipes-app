import { TypeSearch } from '../types';
import { fetchDrinksFirstLetter,
  fetchDrinksIngredient, fetchDrinksName } from './fetchDrinksApi';
import { fetchMealsFirstLetter,
  fetchMealsIngredient, fetchMealsName } from './fetchMealsApi';

export default async function filterFetch(
  namePage: string,
  typeSearch: TypeSearch,
  value?: string,
) {
  if (value) {
    const valueCase = value.toLowerCase();
    switch (typeSearch) {
      case 'ingredient':
        if (namePage === 'meals') {
          return fetchMealsIngredient(valueCase);
        }
        return fetchDrinksIngredient(valueCase);
      case 'name':
        if (namePage === 'meals') {
          return fetchMealsName(valueCase);
        }
        return fetchDrinksName(valueCase);
      case 'first-letter':
        if (namePage === 'meals') {
          return fetchMealsFirstLetter(valueCase);
        }
        return fetchDrinksFirstLetter(valueCase);
      default:
        return null;
    }
  }
}
