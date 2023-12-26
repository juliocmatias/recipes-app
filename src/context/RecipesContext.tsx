import { createContext } from 'react';
import { RecipesType } from '../types';

type RecipesContextType = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  recipes: RecipesType,
  setRecipes: React.Dispatch<React.SetStateAction<RecipesType>>
  showSearch: boolean,
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
};

const RecipesContext = createContext({} as RecipesContextType);

export default RecipesContext;
