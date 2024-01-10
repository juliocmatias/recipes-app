import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RecipeType } from '../../types';
import RecipesContext from '../../context/RecipesContext';
import Loading from '../../components/Loading';
import RecipeDetails from '../../components/RecipeDetails';
import { fetchDrinksDetails } from '../../utils/fetchDrinksApi';
import { fetchMealsDetails } from '../../utils/fetchMealsApi';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({} as RecipeType);
  const param = useParams();
  const { id } = param;
  const path = window.location.pathname.split('/')[1];
  const {
    setLoading,
    loading,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      setLoading(true);
      if (id) {
        if (path === 'drinks') {
          const data = await fetchDrinksDetails(id);

          if (data) setRecipe(data[0]);
        } else {
          const data = await fetchMealsDetails(id);

          if (data) setRecipe(data[0]);
        }
      }
      setLoading(false);
    };
    getRecipeDetails();
  }, [id, path, setLoading]);

  if (loading) return (<Loading />);

  return (
    <RecipeDetails
      recipe={ recipe }
    />
  );
}
