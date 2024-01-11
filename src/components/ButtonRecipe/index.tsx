import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonRecipe.module.css';
import RecipesContext from '../../context/RecipesContext';
import { RecipeType } from '../../types';

type ButtonRecipeProps = {
  recipe: RecipeType
  isProgress: boolean;
  path: string;
  dataTestId: string;
  id: string;
};

export default function ButtonRecipe({ recipe, isProgress,
  path, dataTestId, id }: ButtonRecipeProps) {
  const { ingredientsChecked } = useContext(RecipesContext);

  const [nameButton, setNameButton] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const pathPage = window.location.pathname;

  useEffect(() => {
    const checkButton = () => {
      if (pathPage.includes('in-progress')) {
        setNameButton('FINISH RECIPE');
        if (ingredientsChecked.length === (recipe && recipe.ingredients
          ? recipe.ingredients.length : 0)) {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      } else {
        if (isProgress) {
          setNameButton('CONTINUE RECIPE');
          return;
        }
        setNameButton('START RECIPE');
      }
    };
    checkButton();
  }, [ingredientsChecked.length, isProgress, pathPage, recipe]);

  return (
    <div>
      { nameButton === 'FINISH RECIPE' ? (
        <button
          type="button"
          data-testid={ `${dataTestId}-recipe-btn` }
          className={ styles.recipe_btn }
          disabled={ isDisabled }
        >
          { nameButton }
        </button>
      ) : (
        <button
          type="button"
          onClick={ () => navigate(`/${path}/${id}/in-progress`) }
          data-testid={ `${dataTestId}-recipe-btn` }
          className={ styles.recipe_btn }
        >
          { nameButton }
        </button>
      )}
    </div>
  );
}
