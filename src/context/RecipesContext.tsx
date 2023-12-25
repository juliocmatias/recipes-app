import { createContext } from 'react';
import { RecipesType } from '../types';

type UserContextType = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  recipes: RecipesType,
  setRecipes: React.Dispatch<React.SetStateAction<RecipesType>>
};

const RecipesContext = createContext({} as UserContextType);

export default RecipesContext;
