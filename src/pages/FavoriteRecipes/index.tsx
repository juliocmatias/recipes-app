import { useContext, useEffect } from 'react';
// import CardFavorites from '../components/CardFavorites';
import { getLocalStorage } from '../../utils/locaStorage';
import FilterRecipesStorage from '../../components/FilterRecipesStorage';
import styles from './FavoriteRecipes.module.css';
import RecipesContext from '../../context/RecipesContext';

function FavoriteRecipes() {
  const { favorites, setFavorites, filterRecipesStorage } = useContext(RecipesContext);

  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) setFavorites(favoriteRecipes);
  }, [setFavorites, filterRecipesStorage]);

  if (favorites.length === 0) {
    return (
      <p className={ styles.no_favorite }>
        No favorite recipes have been added!
      </p>
    );
  }
  return (
    <>
      <FilterRecipesStorage
        testIDAll="filter-by-all-btn"
        testIDMeal="filter-by-meal-btn"
        testIDDrink="filter-by-drink-btn"
      />
      {
        filterRecipesStorage.length > 0
          ? (
            <div className={ styles.container }>
              <CardFavorites favorite={ filterRecipesStorage } />
            </div>
          )
          : (<div><CardFavorites favorite={ favorites } /></div>)
      }
    </>
  );
}

export default FavoriteRecipes;
