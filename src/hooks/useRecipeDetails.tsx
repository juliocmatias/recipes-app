import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { RecipeType } from '../types';
import { getLocalStorage } from '../utils/locaStorage';
import { fetchMealsDetails } from '../utils/fetchMealsApi';
import { fetchDrinksDetails } from '../utils/fetchDrinksApi';

const useRecipeDetails = (recipeDetails:RecipeType) => {
  const {
    favorites,
    doneRecipes,
    recipesInProgress,
    setFavorites,
    setDoneRecipes,
    setRecipesInProgress,
    isFavorite,
    setIsFavorite,
    isDone,
    setIsDone,
    isInProgress,
    setIsInProgress,
  } = useContext(RecipesContext);

  const param = useParams();
  const { id } = param;

  const path = window.location.pathname.split('/')[1];

  // const [recipeDetails, setRecipeDetails] = useState({} as RecipeType);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [isDone, setIsDone] = useState(false);
  // const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {
    const updateLocalStorageStates = () => {
      const storageFavorites = getLocalStorage('favoriteRecipes');
      const storageDone = getLocalStorage('doneRecipes');
      const storageInProgress = getLocalStorage('inProgressRecipes');

      if (storageFavorites) setFavorites(storageFavorites);
      if (storageDone) setDoneRecipes(storageDone);
      if (storageInProgress) setRecipesInProgress(storageInProgress);
    };
    const checkRecipeStorage = () => {
      setIsFavorite(favorites.some((item) => item.id === id));
      setIsDone(doneRecipes.some((item) => item.id === id));
      setIsInProgress(
        path === 'meals'
          ? recipeDetails.id in recipesInProgress.meals
          : recipeDetails.id in recipesInProgress.drinks,
      );
    };

    updateLocalStorageStates();
    checkRecipeStorage();
  }, [doneRecipes,
    favorites, id, path, recipeDetails.id,
    recipesInProgress.drinks,
    recipesInProgress.meals,
    setDoneRecipes, setFavorites,
    setIsDone, setIsFavorite, setIsInProgress, setRecipesInProgress]);

  return {
    isFavorite,
    isDone,
    isInProgress,
  };
};

export default useRecipeDetails;
