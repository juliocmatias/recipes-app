import { useContext, useEffect, useState } from 'react';
import allDrinks from '../../images/filtros/drinks/allDrinks.svg';
import ordinaryDrink from '../../images/filtros/drinks/ordinary-drink.svg';
import cocktail from '../../images/filtros/drinks/cocktail.svg';
import shake from '../../images/filtros/drinks/shake.svg';
import other from '../../images/filtros/drinks/other-unknown.svg';
import cocoa from '../../images/filtros/drinks/cocoa.svg';
import styles from './FilterCategories.module.css';
import allMeals from '../../images/filtros/meals/allMeals.svg';
import beef from '../../images/filtros/meals/beef.svg';
import goat from '../../images/filtros/meals/goat.svg';
import chicken from '../../images/filtros/meals/chicken.svg';
import breakfast from '../../images/filtros/meals/breakfast.svg';
import dessert from '../../images/filtros/meals/dessert.svg';
import RecipesContext from '../../context/RecipesContext';
import { fetchDrinksByCategory } from '../../utils/fetchDrinksApi';
import { RecipesType } from '../../types';
import { fetchMealsByCategory } from '../../utils/fetchMealsApi';

const drinksIcons = [
  ordinaryDrink,
  cocktail,
  shake,
  other,
  cocoa,
];

const mealsIcons = [
  beef,
  goat,
  chicken,
  breakfast,
  dessert,
];

const categoriesDrinks = [
  'Ordinary Drink',
  'Cocktail',
  'Shake',
  'Other/Unknown',
  'Cocoa',
];

const categoriesMeals = [
  'Beef',
  'Goat',
  'Chicken',
  'Breakfast',
  'Dessert',
];

type FilterCategoryProps = {
  path: string;
};

export default function FilterCategories({ path }: FilterCategoryProps) {
  const { setFilterRecipesCategory } = useContext(RecipesContext);

  const [iconCategories, setIconCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [srcAll, setSrcAll] = useState('');
  const [filterRecipes, setFilterRecipes] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      if (path === 'drinks') {
        setIconCategories(drinksIcons);
        setCategories(categoriesDrinks);
        setSrcAll(allDrinks);
      } else {
        setIconCategories(mealsIcons);
        setCategories(categoriesMeals);
        setSrcAll(allMeals);
      }
    };

    getCategories();
  }, [path]);

  const handleFilterCategories = async (category: string) => {
    if (path === 'drinks' && category !== 'All') {
      const checkFilter = filterRecipes === category;
      if (checkFilter) {
        setFilterRecipesCategory([]);
        setFilterRecipes('');
        return;
      }
      const dataResponse = await fetchDrinksByCategory(category);
      setFilterRecipes(category);
      setFilterRecipesCategory(dataResponse as RecipesType);
    } else if (path === 'meals' && category !== 'All') {
      const checkFilter = filterRecipes === category;
      if (checkFilter) {
        setFilterRecipesCategory([]);
        setFilterRecipes('');
        return;
      }
      const dataResponse = await fetchMealsByCategory(category);
      setFilterRecipes(category);
      setFilterRecipesCategory(dataResponse as RecipesType);
    }
    if (category === 'All') setFilterRecipesCategory([]);
  };

  return (
    <div className={ styles.container_filters }>
      <button
        data-testid="All-category-filter"
        value="All"
        onClick={ () => handleFilterCategories('All') }
      >
        <img
          className={ styles.icons }
          src={ srcAll }
          alt={ `All ${path === 'meals' ? 'Meals' : 'Drinks'}` }
        />
      </button>
      {categories
          && categories.map((category, index) => (
            <button
              data-testid={ `${category}-category-filter` }
              key={ index }
              value={ category }
              onClick={ () => handleFilterCategories(category) }
            >
              <img
                className={ styles.icons }
                src={ iconCategories[index] }
                alt={ category }
              />
            </button>
          ))}
    </div>
  );
}
