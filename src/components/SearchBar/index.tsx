import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { RecipesType, TypeSearch } from '../../types';
import filterFetch from '../../utils/filterFetch';
import RecipesContext from '../../context/RecipesContext';

const INICIAL_VALUE = {
  infoInput: '',
  radio: 'ingredient',
};

function SearchBar() {
  // pega o pathname da pagina atual
  const path = window.location.pathname.split('/')[1];
  const navigate = useNavigate();

  const { setLoading, setRecipes, recipes } = useContext(RecipesContext);

  // const { filterApi } = useContext(searchBarContext);
  const [searchForm, setSearchForm] = useState(INICIAL_VALUE);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const handleClick = async () => {
    if (searchForm.infoInput === '') {
      return alert('Your search must contain only 1 (one) character');
    }
    setLoading(true);
    const dataResponse: RecipesType = await filterFetch(
      path,
      searchForm.radio as TypeSearch,

      searchForm.infoInput,
    );

    setRecipes((prevState) => ({ ...prevState, ...dataResponse }));
    setLoading(false);
    setSearchForm(INICIAL_VALUE);
    // if (dataResponse && dataResponse.meals?.length === 1) {
    //   navigate(`/${path}/${dataResponse.meals[0].idMeal}`);
    // }
    // if (dataResponse && dataResponse.drinks?.length === 1) {
    //   navigate(`/${path}/${dataResponse.drinks[0].idDrink}`);
    // }
  };

  if ((recipes && recipes.meals.length === 1)
  || (recipes && recipes.drinks.length === 1)) {
    navigate(`/${path}/${path === 'meals'
      ? recipes.meals[0].idMeal : recipes.drinks[0].idDrink}`);
  }
  // colocando valores iniciais para o radio
  // colocando na chave radio o valor 'ingredient';
  // assim quando o componente iniciar 'ingredient' vai estar selecionado.
  return (
    <div className={ styles.container }>

      <label>
        <input
          placeholder="Search"
          className={ styles.input_search }
          onChange={ handleChange }
          name="infoInput"
          value={ searchForm.infoInput }
          data-testid="search-input"
          type="text"
        />
      </label>

      <div className={ styles.container_radio }>
        <div>
          <input
            onChange={ handleChange }
            type="radio"
            name="radio"
            value="ingredient"
            checked={ searchForm.radio === 'ingredient' }
            data-testid="ingredient-search-radio"
          />
          Ingredient
          <input
            onChange={ handleChange }
            name="radio"
            value="name"
            type="radio"
            checked={ searchForm.radio === 'name' }
            data-testid="name-search-radio"
          />
          Name
          <input
            onChange={ handleChange }
            name="radio"
            value="first-letter"
            type="radio"
            checked={ searchForm.radio === 'first-letter' }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </div>
        <button
          className={ styles.button_search }
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search

        </button>
      </div>

    </div>
  );
}

export default SearchBar;
