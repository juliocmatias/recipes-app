import { useContext, useEffect } from 'react';
import { getLocalStorage } from '../../utils/locaStorage';
import RecipesContext from '../../context/RecipesContext';
import FilterRecipesStorage from '../../components/FilterRecipesStorage';
import RecipesCardsStor from '../../components/RecipesCardsStor';
import styles from './DoneRecipes.module.css';

export default function DoneRecipes() {
  const { doneRecipes,
    setDoneRecipes, filterRecipesStorage } = useContext(RecipesContext);

  useEffect(() => {
    const doneRecipesStor = getLocalStorage('doneRecipes');
    if (doneRecipesStor) setDoneRecipes(doneRecipesStor);
  }, [setDoneRecipes, filterRecipesStorage]);

  if (doneRecipes.length === 0) {
    return (
      <p className={ styles.no_favorite }>No done recipes have been added!</p>
    );
  }

  return (
    <>
      <FilterRecipesStorage />
      {
        filterRecipesStorage.length > 0
          ? (
            <div>
              <RecipesCardsStor recipes={ filterRecipesStorage } />
            </div>
          )
          : (
            <div>
              <RecipesCardsStor recipes={ doneRecipes } />
            </div>
          )
      }
    </>
  );
}
