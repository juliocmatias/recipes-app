import { useState } from 'react';
import UserContext from './RecipesContext';
import { DrinksType, MealsType, RecipesType } from '../types';

type UserProviderProps = {
  children: React.ReactNode
};

export default function RecipesProvider({ children }: UserProviderProps) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipesType>([]);
  const [meals, setMeals] = useState<MealsType>([]);
  const [drinks, setDrinks] = useState<DrinksType>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filterRecipesCategory, setFilterRecipesCategory] = useState<RecipesType>([]);

  const context = {
    loading,
    setLoading,
    recipes,
    setRecipes,
    meals,
    drinks,
    setDrinks,
    setMeals,
    showSearch,
    setShowSearch,
    filterRecipesCategory,
    setFilterRecipesCategory,
  };
  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
}
