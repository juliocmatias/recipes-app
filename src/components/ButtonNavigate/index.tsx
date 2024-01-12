import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';
import drinkIcon from '../../images/drinksIconNavigate.svg';
import mealIcon from '../../images/mealsIconNavigate.svg';
import back from '../../images/icons8-back-button-100.png';
import styles from './ButtonNavigate.module.css';

export default function ButtonNavigate() {
  const { setRecipes, setFilterRecipesCategory } = useContext(RecipesContext);
  const navigate = useNavigate();

  return (
    <div className={ styles.container }>
      <button
        onClick={ () => {
          navigate(-1);
          setRecipes([]);
          setFilterRecipesCategory([]);
        } }
        className={ styles.back }
      >
        <img
          src={ back }
          alt="meal icon"
          width={ 50 }
        />
        <span>Back</span>
      </button>
      <button
        onClick={ () => {
          navigate('/drinks');
          setRecipes([]);
          setFilterRecipesCategory([]);
        } }
        className={ styles.drinks }
      >
        <img
          src={ drinkIcon }
          alt="drink icon"
          width={ 50 }
        />
        <span>Drinks</span>
      </button>
      <button
        onClick={ () => {
          navigate('/meals');
          setRecipes([]);
          setFilterRecipesCategory([]);
        } }
        className={ styles.meals }
      >
        <img
          src={ mealIcon }
          alt="meal icon"
          width={ 50 }
        />
        <span>Meals</span>
      </button>
    </div>
  );
}
