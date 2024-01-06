import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails';
import { RecipeType } from '../../types';
import { fetchDrinksDetails } from '../../utils/fetchDrinksApi';
import RecipesContext from '../../context/RecipesContext';
import Loading from '../../components/Loading';

export default function DrinkRecipe() {
  const [recipeDetails, setRecipeDetails] = useState({} as RecipeType);
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
        const data = await fetchDrinksDetails(id);
        if (data) setRecipeDetails(data[0]);
      }
      setLoading(false);
    };
    getRecipeDetails();
  }, [id, setLoading]);

  if (loading) return (<Loading />);

  return (
    <RecipeDetails
      recipeDetails={ recipeDetails }
    />
  );
}
