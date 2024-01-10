import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDrinksRecommendation } from '../../utils/fetchDrinksApi';
import { RecipesType } from '../../types';
import { fetchMealsRecommendation } from '../../utils/fetchMealsApi';
import styles from './CarouselRecommendation.module.css';

type CarouselRecommendationProps = {
  path: string;
};

export default function CarouselRecommendation({ path }: CarouselRecommendationProps) {
  const [recipesRecommendation, setRecipesRecommendation] = useState<RecipesType>([]);
  const [pageInProgress, setPageInProgress] = useState(false);

  const pathRecommendation = path === 'meals' ? 'drinks' : 'meals';

  useEffect(() => {
    const getRecipesRecommendation = async () => {
      const pathName = window.location.pathname;

      setPageInProgress(pathName.includes('in-progress'));
      if (path === 'meals') {
        const data = await fetchDrinksRecommendation();
        if (data) {
          setRecipesRecommendation(data.slice(0, 6));
        }
      } else if (path === 'drinks') {
        const data = await fetchMealsRecommendation();

        if (data) {
          setRecipesRecommendation(data.slice(0, 6));
        }
      }
    };
    getRecipesRecommendation();
  }, [path]);

  return (
    !pageInProgress && (
      <>
        <h2 className={ styles.recommended_title }>Recommended</h2>
        <div className={ styles.container_recipes }>
          { recipesRecommendation.length > 0
            && recipesRecommendation.map((recipe, index) => (
              <Link
                to={ `/${pathRecommendation}/${recipe.id}` }
                key={ recipe.id }
                data-testid={ `${index}-recommendation-card` }
                className={ `${styles.recipeCard}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  width={ 400 }
                  className={ `${styles.recipeImg}` }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  className={ styles.name_recipe }
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recipe.name}
                </p>
              </Link>
            ))}
        </div>
      </>
    )
  );
}
