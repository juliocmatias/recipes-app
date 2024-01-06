import { useContext, useEffect, useState } from 'react';
import { RecipeType } from '../../types';
import RecipesContext from '../../context/RecipesContext';
import useRecipeDetails from '../../hooks/useRecipeDetails';
import Loading from '../Loading';
import InteractiveBtn from '../InteractiveBtn';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import heartWhite from '../../images/whiteHeartIcon.svg';
import styles from './RecipeDetails.module.css';
import mealCategory from '../../images/iconMealCategory.svg';
import drinkCategory from '../../images/iconDrinkCategory.svg';

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
  recipeDetails: RecipeType;
};

export default function RecipeDetails({ recipeDetails }: RecipeDetailsProps) {
  const { setRecipesInProgress, loading, handleIdLink } = useContext(RecipesContext);

  const path = window.location.pathname.split('/')[1];

  const {
    isDone, isFavorite, isInProgress } = useRecipeDetails(recipeDetails);

  if (loading) return (<Loading />);

  return (
    <div
      className={ styles.overlap }
      style={ { backgroundImage: `url(${recipeDetails.image})` } }
    >
      <img
        src={ recipeDetails.image }
        alt={ recipeDetails.name }
        data-testid="recipe-photo"
        className={ styles.recipe_image }
      />
      <h1
        data-testid="recipe-title"
        className={ styles.recipe_title }
      >
        { recipeDetails.name }

      </h1>
      <div className={ styles.category_card }>
        <div className={ styles.category_icon }>
          <img
            src={ path === 'meals'
              ? mealCategory : drinkCategory }
            alt={ recipeDetails.category }
          />
        </div>
        <p
          className={ styles.category_name }
          data-testid="recipe-category"
        >
          { recipeDetails.category }

        </p>
      </div>
      <div className={ styles.interactive_btn }>
        <InteractiveBtn
          srcShare={ share }
          srcFavorite={ isFavorite ? heartBlack : heartWhite }
          dataShare="share-btn"
          dataFavorite="favorite-btn"
          id={ recipeDetails.id }
          type={ recipeDetails.type }
          recipe={ recipeDetails }
          handleIdLink={ handleIdLink }
        />
      </div>
    </div>
  );
}
