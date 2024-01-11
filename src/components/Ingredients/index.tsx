import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';
import {
  getLocalStorage, putLocalStorage } from '../../utils/locaStorage';

type IngredientsProps = {
  ingredients: string[];
};
// esse componente recebe um array de ingredientes e o pathname da pagina atual
// caso o pathname seja '/meals/id', renderize os ingredientes de comida como lista
// caso o pathname seja '/meals/id/in-progress', renderize os ingredientes de comida com checkbox
// caso o pathname seja '/drinks/id', renderize os ingredientes de bebida como lista
// caso o pathname seja '/drinks/id/in-progress', renderize os ingredientes de bebida com checkbox

export default function Ingredients({ ingredients }: IngredientsProps) {
  const [pageInProgress, setPageInProgress] = useState(false);
  const { ingredientsChecked, setIngredientsChecked,
    setRecipesInProgress, setIsInProgress } = useContext(RecipesContext);
  // const [ingredientsChecked, setIngredientsChecked] = useState([] as string[]);

  const path = window.location.pathname;
  const id = path.split('/')[2];
  const pathName = path.split('/')[1] as 'meals' | 'drinks';

  useEffect(() => {
    setPageInProgress(path.includes('in-progress'));
    const verifyRecipeInProgress = () => {
      const inProgressRecipes = getLocalStorage('inProgressRecipes');
      if (inProgressRecipes) {
        setRecipesInProgress(inProgressRecipes);

        // Verificar se 'inProgressRecipes[pathName]' e 'inProgressRecipes[pathName][id]' estão definidos
        if (inProgressRecipes[pathName] && inProgressRecipes[pathName][id]) {
          setIngredientsChecked(inProgressRecipes[pathName][id]);
          setIsInProgress(true);
        }
      }
    };

    verifyRecipeInProgress();
  }, [id, path, pathName, setIngredientsChecked, setIsInProgress, setRecipesInProgress]);

  // console.log(ingredients);
  // console.log(pageInProgress);
  // console.log(recipesInProgress);
  const handleRecipeInProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const { name } = event.target;
    // console.log(isChecked);
    // console.log(name);
    if (isChecked) {
      setIngredientsChecked((prevChecked) => [...prevChecked, name]);
      setRecipesInProgress((prev) => {
        const newInProgress = {
          ...prev,
          [pathName]: {
            ...prev[pathName],
            [id]: [...(prev[pathName][id] || []), name],
          },
        };
        putLocalStorage('inProgressRecipes', newInProgress);
        return newInProgress;
      });
      setIsInProgress(true);
    } else {
      setIngredientsChecked((prevChecked) => prevChecked.filter((item) => item !== name));
      setRecipesInProgress((prev) => {
        const updatedIngredients = prev[pathName][id].filter((item) => item !== name);

        const newInProgress = {
          ...prev,
          [pathName]: {
            ...prev[pathName],
            [id]: updatedIngredients,
          },
        };

        // Verifica se o array de ingredientes é vazio e remove o ID correspondente
        if (updatedIngredients.length === 0) {
          delete newInProgress[pathName][id];
          setIsInProgress(false);
        }

        putLocalStorage('inProgressRecipes', newInProgress);
        return newInProgress;
      });

      setIsInProgress(true);
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
          style={ { textDecoration: ingredientsChecked
            .includes(ingredient) ? 'line-through' : 'none' } }
        >
          <input
            type="checkbox"
            id={ ingredient }
            name={ ingredient }
            checked={ ingredientsChecked.includes(ingredient) }
            onChange={ handleRecipeInProgress }
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
