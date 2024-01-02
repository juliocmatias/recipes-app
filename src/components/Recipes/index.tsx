import { useContext, useEffect } from 'react';
import RecipesContext from '../../context/RecipesContext';
import Loading from '../Loading';
import filterFetch from '../../utils/filterFetch';
import { RecipesType } from '../../types';
import RecipesCards from '../RecipesCards';

export default function Recipes() {
  const { loading,
    setLoading, setRecipes, recipes } = useContext(RecipesContext);

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
  }, [path, setLoading, setRecipes]);
  return (
    <>
      {loading && <Loading />}
      <RecipesCards
        path={ path as 'meals' | 'drinks' }
        recipes={ recipes }
      />
    </>
  );
}
