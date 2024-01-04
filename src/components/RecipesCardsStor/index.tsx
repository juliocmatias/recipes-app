import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeLocalStorageType } from '../../types';
import styles from './RecipesCardsStor.module.css';
import ShowShareAlert from '../ShowShareAlert';
import RecipesContext from '../../context/RecipesContext';
import InfoRecipe from '../InfoRecipe';

type RecipesCardsStorProps = {
  recipes: RecipeLocalStorageType[];
};

export default function RecipesCardsStor({ recipes }: RecipesCardsStorProps) {
  const { idLinkAlert } = useContext(RecipesContext);
  return (
    recipes.length > 0 && recipes.map((recipe, index) => (
      <div key={ recipe.id }>
        {idLinkAlert.id === recipe.id && idLinkAlert.type === recipe.type
        && <ShowShareAlert />}
        <div className={ styles.card_recipe }>
          <div className="img-recipe">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className={ styles.image_recipe }
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
          </div>
          <InfoRecipe
            classInfoRecipe={ styles.info_recipe }
            classLink={ styles.link }
            recipe={ recipe }
            index={ index }
            classNameTitle={ styles.title_recipe }
            classNameDiv={ styles.name_recipe }
            classSubtitle={ styles.subtitle }
          />
          {/* <div className={ styles.info_recipe }>

            <Link
              className={ styles.link }
              to={ `/${recipe.type}s/${recipe.id}` }
            >

              <RecipeTitle
                classNameTitle={ styles.title_recipe }
                classNameDiv={ styles.name_recipe }
                testId={ `${index}-horizontal-name` }
                name={ recipe.name }
              />
            </Link>
            <div
              className={ styles.subtitle }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'meal' ? (
                <span>
                  {`${recipe.nationality} - ${recipe.category}`}
                </span>
              ) : (
                <span>
                  {recipe.alcoholicOrNot}
                </span>
              )}
            </div>
            <InteractiveBtn
              srcShare={ share }
              srcFavorite={ heartBlack }
              dataShare={ `${index}-horizontal-share-btn` }
              dataFavorite={ `${index}-horizontal-favorite-btn` }
              id={ recipe.id }
              type={ recipe.type }
              handleIdLink={ handleIdLink }
            />
          </div> */}
        </div>

      </div>

    ))
  );
}
