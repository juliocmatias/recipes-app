import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { RecipesType, SearchFormType, TypeSearch } from '../../types';
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

  const [searchForm, setSearchForm] = useState<SearchFormType>(INICIAL_VALUE);

  useEffect(() => {
    const handleNavigate = () => {
      if (recipes.length === 1) {
        navigate(`/${path}/${recipes[0].id}`);
      }
    };
    handleNavigate();
  }, [recipes, path, navigate]);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const handleClick = async () => {
    if (searchForm.infoInput === '') {
      return alert('Your search must contain only 1 (one) character');
    }
    setLoading(true);
    const dataResponse = await filterFetch(
      path,
      searchForm.radio as TypeSearch,

      searchForm.infoInput,
    ) as RecipesType;
    if (dataResponse) setRecipes(dataResponse);
    setLoading(false);
    setSearchForm(INICIAL_VALUE);
  };

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
          maxLength={ 30 }
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
