import { createContext } from 'react';
import { DrinksType, MealsType, RecipeLocalStorageType, RecipesType } from '../types';

type RecipesContextType = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  recipes: RecipesType,
  setRecipes: React.Dispatch<React.SetStateAction<RecipesType>>
  meals: MealsType,
  setMeals: React.Dispatch<React.SetStateAction<MealsType>>
  drinks: DrinksType,
  setDrinks: React.Dispatch<React.SetStateAction<DrinksType>>
  showSearch: boolean,
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
  filterRecipesCategory: RecipesType,
  setFilterRecipesCategory: React.Dispatch<React.SetStateAction<RecipesType>>
  favorites: RecipeLocalStorageType[],
  setFavorites: React.Dispatch<React.SetStateAction<RecipeLocalStorageType[]>>
  filterRecipesStorage: RecipeLocalStorageType[],
  setFilterRecipesStorage: React.Dispatch<React.SetStateAction<RecipeLocalStorageType[]>>
  doneRecipes: RecipeLocalStorageType[],
  setDoneRecipes: React.Dispatch<React.SetStateAction<RecipeLocalStorageType[]>>
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
