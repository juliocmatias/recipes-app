import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails';
import RecipesContext from '../../context/RecipesContext';
import { fetchMealsDetails } from '../../utils/fetchMealsApi';
import Loading from '../../components/Loading';
import { RecipeType } from '../../types';

export default function MealRecipe() {
  const [recipe, setRecipe] = useState({} as RecipeType);
  const param = useParams();
  const { id } = param;

  const {
    setLoading,
    loading,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getRecipeDetails = async () => {
      setLoading(true);
      if (id) {
        const data = await fetchMealsDetails(id);
        if (data) setRecipe(data[0]);
      }
      setLoading(false);
    };
    getRecipeDetails();
  }, [id, setLoading]);

  if (loading) return (<Loading />);

  return (
    <RecipeDetails
      recipe={ recipe }
    />
  );
}
