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

export type TypeSearch = 'ingredient' | 'name' | 'first-letter' | 'default';

export type RecipesType = {
  strMeal?: string;
  strMealThumb?: string;
  idMeal?: string;
  strCategory?: string;
  strInstructions?: string;
  ingredients?: string[];
  strArea?: string;
  strYoutube?: string;
}[] | {
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

export type MealsType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strCategory?: string;
  strInstructions?: string;
  ingredients?: string[];
  strArea?: string;
  strYoutube?: string;
}[];

export type DrinksType = {
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

export type DataMealsType = {
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
};

export type DataDrinksType = {
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

export type SearchFormType = {
  infoInput: string;
  radio: string;
};
