export type KeyLocalStorageType = 'favoriteRecipes' | 'doneRecipes' | 'user' | 'clear';

export type RecipeLocalStorageType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
};
export type UserLocalStorageType = {
  email: string;
};
