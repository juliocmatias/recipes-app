export type KeyLocalStorageType = 'favoriteRecipes'
| 'doneRecipes' | 'user' | 'clear' | 'inProgressRecipes';

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

export type InProgressRecipesType = {
  meals: {
    [id: string]: string[],
  },
  drinks: {
    [id: string]: string[],
  },
};

export type UserLocalStorageType = {
  email: string;
};

export type TypeSearch = 'ingredient'
| 'name'
| 'first-letter'
| 'recommendation'
| 'category'
| 'default';

export type RecipeType = {
  id: string;
  type: 'meal' | 'drink';
  nationality: string | '';
  category: string | '';
  alcoholicOrNot: 'alcoholic' | 'non-alcoholic' | '';
  name: string;
  image: string;
  doneDate?: string;
  tags?: string[];
  instructions?: string;
  ingredients?: string[]
  video?: string;
};

export type RecipesType = RecipeType[];

export type MealsType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strCategory?: string;
  strInstructions?: string;
  strArea?: string;
  strYoutube?: string;
  strTags?: string;
  dateModified?: string;
  [key: string]: any;
}[];

export type DrinksType = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
  strCategory?: string;
  strInstructions?: string;
  strArea?: string;
  strYoutube?: string;
  strAlcoholic?: string;
  containsAlcoholic?: boolean;
  strTags?: string;
  dateModified?: string;
  [key: string]: any;
}[];

export type DataMealsType = {
  meals:
  {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
    strCategory?: string;
    strInstructions?: string;
    strArea?: string;
    strYoutube?: string;
    strTags?: string;
    dateModified?: string;
    [key: string]: any;
  }[];
};

export type DataDrinksType = {
  drinks: {
    strDrink: string;
    strDrinkThumb: string;
    idDrink: string;
    strCategory?: string;
    strInstructions?: string;
    strArea?: string;
    strYoutube?: string;
    strAlcoholic?: string;
    containsAlcoholic?: boolean;
    strTags?: string;
    dateModified?: string;
    [key: string]: any;
  }[];
};

export type DataMockType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}[];

export type SearchFormType = {
  infoInput: string;
  radio: string;
};

export type DataCategoryMealsType = {
  meals: {
    strCategory: string;
  }[];
};

export type DataCategoryDrinksType = {
  drinks: {
    strCategory: string;
  }[];
};

export type CategoryMealsType = [
  'Beef',
  'Breakfast',
  'Chicken',
  'Dessert',
  'Goat',
];

export type CategoryDrinksType = [
  'Ordinary Drink',
  'Cocktail',
  'Shake',
  'Other/Unknown',
  'Cocoa',
];
