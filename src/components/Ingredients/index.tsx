import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';
import { putLocalStorage } from '../../utils/locaStorage';

type IngredientsProps = {
  ingredients: string[];
  inProgress: boolean;
};
// esse componente recebe um array de ingredientes e o pathname da pagina atual
// caso o pathname seja '/meals/id', renderize os ingredientes de comida como lista
// caso o pathname seja '/meals/id/in-progress', renderize os ingredientes de comida com checkbox
// caso o pathname seja '/drinks/id', renderize os ingredientes de bebida como lista
// caso o pathname seja '/drinks/id/in-progress', renderize os ingredientes de bebida com checkbox

export default function Ingredients({ ingredients, inProgress }: IngredientsProps) {
  const [pageInProgress, setPageInProgress] = useState(false);
  const { recipesInProgress, setRecipesInProgress } = useContext(RecipesContext);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);

  const path = window.location.pathname;

  useEffect(() => {
    setPageInProgress(path.includes('in-progress'));
    const verifyRecipeInProgress = () => {
    };
    verifyRecipeInProgress();
  }, [path]);

  // console.log(ingredients);
  // console.log(pageInProgress);
  // console.log(recipesInProgress);
  const handleRecipeInProgress = (ingredient: string) => {
    const pathName = window.location.pathname.split('/')[1];
    const id = window.location.pathname.split('/')[2];
    if (pathName === 'meals' || pathName === 'drinks') {
      // const verifyIdInProgress = recipesInProgress[pathName][id];
      // const verifyIngredient = verifyIdInProgress.includes(ingredient);
      if (!recipesInProgress[pathName][id]) {
        console.log('entrou');

        setRecipesInProgress({
          ...recipesInProgress,
          [pathName]: {
            ...recipesInProgress[pathName],
            [id]: [ingredient],
          },
        });
        putLocalStorage('inProgressRecipes', recipesInProgress);
      } else {
        console.log('entrou no else');
        // verifica se o ingrediente já está no array
        // se estiver, remove
        // se não estiver, adiciona
        const verifyIngredient = recipesInProgress[pathName][id].includes(ingredient);
        if (verifyIngredient) {
          const newIngredients = recipesInProgress[pathName][id]
            .filter((item) => item !== ingredient);
          setRecipesInProgress({
            ...recipesInProgress,
            [pathName]: {
              ...recipesInProgress[pathName],
              [id]: newIngredients,
            },
          });
        } else {
          setRecipesInProgress({
            ...recipesInProgress,
            [pathName]: {
              ...recipesInProgress[pathName],
              [id]: [...recipesInProgress[pathName][id], ingredient],
            },
          });
        }
      }
    }
  };
  // console.log(ingredients);

  return (
    <div className="ingredients_Card">
      <h2>Ingredients</h2>
      { pageInProgress ? ingredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ ingredient }
            name={ ingredient }
            onClick={ () => handleRecipeInProgress(ingredient) }
          />
          { ingredient }
        </label>
      )) : (
        <ul>
          { ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }

            </li>
          )) }
        </ul>) }

    </div>
  );
}
