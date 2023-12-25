import { useState } from 'react';
import UserContext from './RecipesContext';
import { RecipesType } from '../types';

type UserProviderProps = {
  children: React.ReactNode
};

export default function RecipesProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>({ meals: [], drinks: [] });

  const context = {
    loading,
    setLoading,
    recipes,
    setRecipes,
  };
  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
}
