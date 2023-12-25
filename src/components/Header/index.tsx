import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.css';
import profile from '../../images/icone-perfil.svg';
import search from '../../images/icone-pesquisa.svg';
import appName from '../../images/logo-name-app.svg';
import logo from '../../images/icone-recipes-app.svg';
import SearchBar from '../SearchBar';

type HeaderProps = {
  namePage: string,
  pageIcon: string,
};

function Header({ namePage, pageIcon }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (

    <header className={ styles.header }>
      <div className={ styles.container_header }>
        <div>
          <img src={ logo } alt="logo" />
          <img
            className={ styles.appName }
            src={ appName }
            alt="title"
          />
        </div>
        <div>
          {(namePage === 'Meals' || namePage === 'Drinks')
&& (
  <button
    onClick={ handleSearch }
  >
    <img
      className={ styles.search_icon }
      src={ search }
      alt="pesquisar"
      data-testid="search-top-btn"
    />
  </button>
)}
          <button onClick={ () => navigate('/profile') }>
            <img src={ profile } alt="profile" data-testid="profile-top-btn" />
          </button>
        </div>
      </div>
      <div>
        <div className={ styles.container_namePage }>
          <div>
            <img
              className={ styles.pageIcon }
              src={ pageIcon }
              alt={ namePage }
            />
          </div>
          <h1
            className={ styles.titlePage }
            data-testid="page-title"
          >
            {namePage}
          </h1>
        </div>
        { showSearch
      && <SearchBar />}
      </div>
    </header>
  );
}

export default Header;
