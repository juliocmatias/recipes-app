import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import MealRecipe from './pages/MealRecipe';
import Drinks from './pages/Drinks';
import DrinkRecipe from './pages/DrinkRecipe';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Layout from './components/Layout';
import mealsIcon from './images/meal-icon.svg';
import drinkIcon from './images/drink-icon.svg';
import doneRecipeIcon from './images/doneRecipeIcon.svg';
import favoriteIcon from './images/favoriteRecipeIcon.svg';
import profileIcon from './images/icone-perfil.svg';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route
        path="/meals"
        element={
          <Layout namePage="Meals" pageIcon={ mealsIcon } />
}
      >
        <Route index element={ <Meals /> } />
      </Route>
      <Route
        path="/drinks"
        element={
          <Layout namePage="Drinks" pageIcon={ drinkIcon } />
}
      >
        <Route index element={ <Drinks /> } />
      </Route>
      <Route
        path="/profile"
        element={
          <Layout namePage="Profile" pageIcon={ profileIcon } />
}
      >
        <Route index element={ <Profile /> } />
      </Route>
      <Route
        path="/done-recipes"
        element={
          <Layout namePage="Done Recipes" pageIcon={ doneRecipeIcon } />
}
      >
        <Route index element={ <DoneRecipes /> } />
      </Route>
      <Route
        path="/favorite-recipes"
        element={
          <Layout namePage="Favorite Recipes" pageIcon={ favoriteIcon } />
}
      >
        <Route index element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <MealRecipe /> } />
      <Route path="/drinks/:id" element={ <DrinkRecipe /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
    </Routes>
  );
}

export default App;
