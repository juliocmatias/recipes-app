const alertError = "Sorry, we haven't found any recipes for these filters";

export const fetchIngredient = async (namePage: string, ingredient: string) => {
  const nameUrl = namePage === 'meals' ? 'meal' : 'cocktail';
  try {
    const response = await fetch(
      `https://www.the${nameUrl}db.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await response.json();
    if (data.meals === null || data.drinks === null) {
      return window.alert(alertError);
    }
    return data;
  } catch (error) {
    console.log('Erro busca por ingredientes', error);
  }
};

export const fetchName = async (namePage: string, name: string) => {
  const nameUrl = namePage === 'meals' ? 'meal' : 'cocktail';
  try {
    const response = await fetch(
      `https://www.the${nameUrl}db.com/api/json/v1/1/search.php?s=${name}`,
    );
    const data = await response.json();
    if (data.meals === null || data.drinks === null) {
      return window.alert(alertError);
    }
    return data;
  } catch (error) {
    console.log('Erro busca por name', error);
  }
};

export const fetchFirstLetter = async (namePage: string, firstLetter: string) => {
  const nameUrl = namePage === 'meals' ? 'meal' : 'cocktail';
  if (firstLetter.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }
  try {
    const response = await fetch(
      `https://www.the${nameUrl}db.com/api/json/v1/1/search.php?f=${firstLetter}`,
    );
    const data = await response.json();
    if (data.meals === null || data.drinks === null) {
      return window.alert(alertError);
    }
    return data;
  } catch (error) {
    console.log('Erro busca por first letter', error);
  }
};
