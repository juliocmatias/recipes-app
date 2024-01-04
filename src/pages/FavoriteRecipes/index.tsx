import { useContext, useEffect } from 'react';
import { getLocalStorage } from '../../utils/locaStorage';
import FilterRecipesStorage from '../../components/FilterRecipesStorage';
import styles from './FavoriteRecipes.module.css';
import RecipesContext from '../../context/RecipesContext';
import RecipesCardsStor from '../../components/RecipesCardsStor';

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
      <FilterRecipesStorage />
      {
        filterRecipesStorage.length > 0
          ? (
            <div className={ styles.container }>
              <RecipesCardsStor recipes={ filterRecipesStorage } />
            </div>
          )
          : (
            <div className={ styles.container }>
              <RecipesCardsStor recipes={ favorites } />
            </div>
          )
      }
    </>
  );
}

export default FavoriteRecipes;
