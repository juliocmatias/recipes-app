import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';

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
  const { recipesInProgress } = useContext(RecipesContext);

  useEffect(() => {
    const pathName = window.location.pathname;
    setPageInProgress(pathName.includes('in-progress'));
  }, []);

  // console.log(ingredients);
  // console.log(pageInProgress);
  // console.log(recipesInProgress);

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
