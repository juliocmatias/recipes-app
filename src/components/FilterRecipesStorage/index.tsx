// esse componente renderizará os botões para filtrar as receitas;
import { useContext } from 'react';
import ALLRecipes from '../../images/filtros/storage/allRecipes.svg';
import Foots from '../../images/filtros/storage/foods.svg';
import Drinks from '../../images/filtros/storage/drinks.svg';
import styles from './FilterRecipesStorage.module.css';
import RecipesContext from '../../context/RecipesContext';

// type FilterRecipesProps = {
//   testIDAll: string;
//   testIDMeal: string;
//   testIDDrink: string;
// };

export default function FilterRecipesStorage() {
  const { favorites, doneRecipes, setFilterRecipesStorage } = useContext(RecipesContext);

  // pegar o pathName para saber qual pagina está sendo renderizada
  const pathName = window.location.pathname;

  const handleFilter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    const altIgm = button.children[0].getAttribute('alt');
    switch (altIgm) {
      case 'All Recipes Filter Icon':
        setFilterRecipesStorage([]);
        break;
      case 'Meals Filter Icon':
        if (pathName === '/favorite-recipes') {
          const filterMeals = favorites.filter((item) => item.type === 'meal');
          setFilterRecipesStorage(filterMeals);
        } else if (pathName === '/done-recipes') {
          const filterMeals = doneRecipes.filter((item) => item.type === 'meal');
          setFilterRecipesStorage(filterMeals);
        }
        break;
      case 'Drinks Filter Icon':
        if (pathName === '/favorite-recipes') {
          const filterDrinks = favorites.filter((item) => item.type === 'drink');
          setFilterRecipesStorage(filterDrinks);
        } else if (pathName === '/done-recipes') {
          const filterDrinks = doneRecipes.filter((item) => item.type === 'drink');
          setFilterRecipesStorage(filterDrinks);
        }
        break;
      default:
    }
  };
  return (
    <div className={ styles.filters_Recipes }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ ALLRecipes } alt="All Recipes Filter Icon" />
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Foots } alt="Meals Filter Icon" />
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleFilter(event) }
      >
        <img src={ Drinks } alt="Drinks Filter Icon" />
      </button>
    </div>
  );
}
