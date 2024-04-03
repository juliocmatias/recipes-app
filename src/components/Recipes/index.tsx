import { useContext, useEffect } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Loading from '../Loading';
import filterFetch from '../../utils/filterFetch';
import { RecipesType } from '../../types';
import RecipesCards from '../RecipesCards';
import FilterCategories from '../FilterCategories';

export default function Recipes() {
  const { loading,
    setLoading, setRecipes, recipes, filterRecipesCategory } = useContext(RecipesContext);

  // pega o pathname da pagina atual
  const path = window.location.pathname.split('/')[1];

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      setRecipes([]);
      const dataResponse = await filterFetch(
        path,
        'recommendation',
      ) as RecipesType;

      if (dataResponse) setRecipes(dataResponse);
      setLoading(false);
    };
    getRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, setRecipes]);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <FilterCategories path={ path } />
          {filterRecipesCategory && filterRecipesCategory.length > 0 ? (
            <RecipesCards
              path={ path as 'meals' | 'drinks' }
              recipes={ filterRecipesCategory }
            />
          ) : (
            <RecipesCards
              path={ path as 'meals' | 'drinks' }
              recipes={ recipes }
            />
          )}
        </>
      )}
    </>
  );
}
