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

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/meals/:id" element={ <MealRecipe /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/drinks/:id" element={ <DrinkRecipe /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
    </Routes>
  );
}

export default App;
