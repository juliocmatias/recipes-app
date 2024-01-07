import { useContext, useEffect, useState } from 'react';
import { RecipeType } from '../../types';
import RecipesContext from '../../context/RecipesContext';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import InteractiveBtn from '../InteractiveBtn';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import heartWhite from '../../images/whiteHeartIcon.svg';
import styles from './RecipeDetails.module.css';
import mealCategory from '../../images/iconMealCategory.svg';
import drinkCategory from '../../images/iconDrinkCategory.svg';
import ShowShareAlert from '../ShowShareAlert';

// const INITIAL_STATE: RecipeType = {
//   id: '',
//   type: 'meal',
//   nationality: '',
//   category: '',
//   alcoholicOrNot: '',
//   name: '',
//   image: '',
// };

type RecipeDetailsProps = {
  recipe: RecipeType;
};

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const { setRecipesInProgress, handleIdLink } = useContext(RecipesContext);

  const path = window.location.pathname.split('/')[1];

  const {
    isDone, isFavorite, isInProgress } = useRecipeDetails(recipe);

  return (
    <>
      <div
        className={ styles.overlap }
        style={ { backgroundImage: `url(${recipe.image})` } }
      >
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid="recipe-photo"
          className={ styles.recipe_image }
        />
        <h1
          data-testid="recipe-title"
          className={ styles.recipe_title }
        >
          { recipe.name }

        </h1>
        <div className={ styles.category_card }>
          <div className={ styles.category_icon }>
            <img
              src={ path === 'meals'
                ? mealCategory : drinkCategory }
              alt={ recipe.category }
            />
          </div>
          <p
            className={ styles.category_name }
            data-testid="recipe-category"
          >
            { recipe.category }

          </p>
        </div>
        <div className={ styles.interactive_btn }>
          <InteractiveBtn
            srcShare={ share }
            srcFavorite={ isFavorite ? heartBlack : heartWhite }
            dataShare="share-btn"
            dataFavorite="favorite-btn"
            id={ recipe.id }
            type={ recipe.type }
            recipe={ recipe }
            handleIdLink={ handleIdLink }
          />
        </div>
      </div>
      <ShowShareAlert />
    </>
  );
}
