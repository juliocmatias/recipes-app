import { TypeSearch } from '../types';
import { fetchFirstLetter, fetchIngredient, fetchName } from './fetchApi';

// type FilterFetchType = {
//   value?: string;
//   typeSearch: TypeSearch;
//   namePage: string;
// };

export default async function filterFetch(
  namePage: string,
  typeSearch: TypeSearch,
  value?: string,
) {
  if (value) {
    switch (typeSearch) {
      case 'ingredient':
        return fetchIngredient(namePage, value);
      case 'name':
        return fetchName(namePage, value);
      case 'first-letter':
        return fetchFirstLetter(namePage, value);
      default:
    }
  }
}
