import { Link } from 'react-router-dom';
import { RecipesType } from '../../types';
import styles from './RecipesCards.module.css';

type RecipeCardsProps = {
  path: 'meals' | 'drinks';
  recipes: RecipesType;
};

export default function RecipesCards({ path, recipes }: RecipeCardsProps) {
  return (
    <div
      className={
        styles.container_recipes
}
    >
      {recipes && recipes.map((recipe, index) => (
        <Link
          to={ `/${path}/${recipe}` }
          key={ recipe.id }
          data-testid={ `${index}-recipe-card` }
          className={ styles.recipeCard }
        >
          <img
            src={ recipe.image }
            alt={ recipe.name }
            width={ 400 }
            className={ styles.recipeImg }
            data-testid={ `${index}-card-img` }
          />
          <p
            className={ styles.name_recipe }
            data-testid={ `${index}-card-name` }
          >
            {recipe.name}

          </p>
        </Link>
      ))}
    </div>
  );
}
