import {
  DrinksType,
  MealsType,
} from '../types';

interface NewRecipe {
  id: string;
  type: 'drink' | 'meal';
  nationality: string;
  category: string;
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
  instructions: string;
  ingredients: string[];
}

const formatIngredients = (drink: DrinksType[0] | MealsType[0]): string[] => {
  const ingredients: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  return ingredients;
};

const transformDrink = (drink: DrinksType[0]): NewRecipe => {
  return {
    id: drink.idDrink,
    type: 'drink',
    nationality: drink.strArea || '',
    category: drink.strCategory || '',
    alcoholicOrNot: drink.strAlcoholic === 'Alcoholic' ? 'alcoholic' : 'non-alcoholic',
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    doneDate: drink.dateModified || '',
    tags: drink.strTags ? drink.strTags.split(',') : [],
    instructions: drink.strInstructions || '',
    ingredients: formatIngredients(drink),
  };
};

const transformMeal = (meal: MealsType[0]): NewRecipe => {
  return {
    id: meal.idMeal,
    type: 'meal',
    nationality: meal.strArea || '',
    category: meal.strCategory || '',
    alcoholicOrNot: '',
    name: meal.strMeal,
    image: meal.strMealThumb,
    doneDate: meal.dateModified || '',
    tags: meal.strTags ? meal.strTags.split(',') : [],
    instructions: meal.strInstructions || '',
    ingredients: formatIngredients(meal),
  };
};

export const dataProcessing = (
  data: DrinksType | MealsType,
  type: 'meals' | 'drinks',
): NewRecipe[] | undefined => {
  if (type === 'drinks') {
    const dataReceived = data as DrinksType;

    const transformedDrinks: NewRecipe[] = dataReceived
      .map((drink) => transformDrink(drink));

    return transformedDrinks;
  } if (type === 'meals') {
    const dataReceived = data as MealsType;

    const transformedMeals: NewRecipe[] = dataReceived
      .map((meal) => transformMeal(meal));

    return transformedMeals;
  }
};
