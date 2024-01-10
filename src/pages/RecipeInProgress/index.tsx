import Ingredients from '../../components/Ingredients';

export default function RecipeInProgress() {
  return (
    <>
      <h1>RecipeInProgress</h1>
      <Ingredients
        inProgress
        ingredients={ [] }
      />
    </>
  );
}
