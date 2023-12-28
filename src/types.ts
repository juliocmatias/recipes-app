export type KeyLocalStorageType = 'favoriteRecipes' | 'doneRecipes' | 'user' | 'clear';

export type RecipeLocalStorageType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
};
export type UserLocalStorageType = {
  email: string;
};

export type TypeSearch = 'ingredient'
| 'name' | 'first-letter' | 'recommendation' | 'category' | 'details';

export type RecipesType = {
  meals:
  {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
    strCategory?: string;
    strInstructions?: string;
    ingredients?: string[];
    strArea?: string;
    strYoutube?: string;
  }[];
  drinks: {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
    strCategory?: string;
    strInstructions?: string;
    ingredients?: string[];
    strArea?: string;
    strYoutube?: string;
    strAlcoholic?: string;
    containsAlcoholic?: boolean;
  }[];
};

export type RecipesMealsType = {
  meals:
  {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
    strCategory?: string;
    strInstructions?: string;
    ingredients?: string[];
    strArea?: string;
    strYoutube?: string;
  }[]
};

export type RecipesDrinksType = {
  drinks: {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
    strCategory?: string;
    strInstructions?: string;
    ingredients?: string[];
    strArea?: string;
    strYoutube?: string;
    strAlcoholic?: string;
    containsAlcoholic?: boolean;
  }[]
};
