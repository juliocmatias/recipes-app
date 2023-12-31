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
    switch (typeSearch) {
      case 'ingredient':
        if (namePage === 'meals') {
          return fetchMealsIngredient(value);
        }
        return fetchDrinksIngredient(value);
      case 'name':
        if (namePage === 'meals') {
          return fetchMealsName(value);
        }
        return fetchDrinksName(value);
      case 'first-letter':
        if (namePage === 'meals') {
          return fetchMealsFirstLetter(value);
        }
        return fetchDrinksFirstLetter(value);
      default:
        return null;
    }
  }
}
