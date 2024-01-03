import { createContext } from 'react';
import { DrinksType, MealsType, RecipesType } from '../types';

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
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
