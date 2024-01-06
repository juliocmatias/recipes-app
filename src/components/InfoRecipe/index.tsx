import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeLocalStorageType } from '../../types';
import RecipeTitle from '../RecipeTitle';
import share from '../../images/shareIcon.svg';
import heartBlack from '../../images/blackHeartIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import InteractiveBtn from '../InteractiveBtn';
import styles from './InfoRecipe.module.css';

type InfoRecipeProps = {
  classInfoRecipe: string,
  classLink: string,
  recipe: RecipeLocalStorageType,
  index: number,
  classNameTitle: string,
  classNameDiv: string,
  classSubtitle: string,
};

export default function InfoRecipe({
  classInfoRecipe,
  classLink,
  index, recipe, classNameDiv, classNameTitle, classSubtitle }: InfoRecipeProps) {
  const { handleIdLink } = useContext(RecipesContext);
  const path = window.location.pathname.split('/')[1];

  const verifyPath = path === 'done-recipes';

  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dataFormatted = `${day < 10 ? `0${day}`
      : day}/${month < 10 ? `0${month}` : month}/${year}`;
    return dataFormatted;
  };

  return (
    <div className={ classInfoRecipe }>

      <Link
        className={ classLink }
        to={ `/${recipe.type}s/${recipe.id}` }
      >

        <RecipeTitle
          classNameTitle={ classNameTitle }
          classNameDiv={ classNameDiv }
          testId={ `${index}-horizontal-name` }
          name={ recipe.name }
        />
      </Link>
      <div
        className={ classSubtitle }
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
        {verifyPath && (
          <div className={ styles.done_info }>
            <div className={ styles.done_date }>
              <span data-testid={ `${index}-horizontal-done-date` }>
                {`Done in: ${convertDate(recipe.doneDate as string)}`}
              </span>
            </div>
            <div className={ styles.done_tag_card }>
              {recipe.tags?.length && recipe.tags.map((tag) => (
                <span
                  key={ tag }
                  className={ styles.done_tags }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="button_done">
        <InteractiveBtn
          srcShare={ share }
          srcFavorite={ heartBlack }
          dataShare={ `${index}-horizontal-share-btn` }
          dataFavorite={ `${index}-horizontal-favorite-btn` }
          id={ recipe.id }
          type={ recipe.type }
          recipe={ recipe }
          handleIdLink={ handleIdLink }
        />
      </div>
    </div>
  );
}
