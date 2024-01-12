import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonRecipe.module.css';
import RecipesContext from '../../context/RecipesContext';
import { RecipeType } from '../../types';
import { putLocalStorage } from '../../utils/locaStorage';

type ButtonRecipeProps = {
  recipe: RecipeType
  isProgress: boolean;
  path: string;
  dataTestId: string;
  id: string;
  isDone: boolean;
};

export default function ButtonRecipe({ recipe, isProgress,
  path, dataTestId, id, isDone }: ButtonRecipeProps) {
  const { ingredientsChecked, setIsDone, setDoneRecipes,
    setIsInProgress, setRecipesInProgress,
    setIngredientsChecked } = useContext(RecipesContext);
  const pathName = path as 'meals' | 'drinks';
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
  }, [ingredientsChecked, isProgress, pathPage, recipe,
    setIsDisabled, setIsInProgress]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  };

  const updateInProgress = (prev: any, PATH: string, ID: string) => {
    const newInProgress = {
      ...prev,
      [PATH]: {
        ...prev[PATH],
        [ID]: [],
      },
    };
    delete newInProgress[PATH][ID];
    putLocalStorage('inProgressRecipes', newInProgress);
    setIngredientsChecked([]);
    setIsDone(true);
    setIsInProgress(false);
    return newInProgress;
  };

  const handleRecipeDone = () => {
    if (!isDone) {
      const date = new Date();
      const doneDateFormatted = formatDate(date);

      const doneRecipe: RecipeType = {
        id: recipe.id,
        type: pathName === 'meals' ? 'meal' : 'drink',
        nationality: recipe.nationality || '',
        category: recipe.category || '',
        alcoholicOrNot: recipe.alcoholicOrNot || '',
        name: recipe.name,
        image: recipe.image,
        doneDate: doneDateFormatted,
        tags: recipe.tags || [],
      };

      putLocalStorage('doneRecipes', doneRecipe);
      setDoneRecipes((prev) => [...prev, doneRecipe]);
      // deletar id do recipesInProgress
      setRecipesInProgress((prev) => updateInProgress(prev, pathName, id));
    } else {
      setRecipesInProgress((prev) => updateInProgress(prev, pathName, id));
    }

    navigate('/done-recipes');
  };

  return (
    <div>
      { nameButton === 'FINISH RECIPE' ? (
        <button
          type="button"
          data-testid={ `${dataTestId}-recipe-btn` }
          className={ styles.recipe_btn }
          disabled={ isDisabled }
          onClick={ handleRecipeDone }
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
