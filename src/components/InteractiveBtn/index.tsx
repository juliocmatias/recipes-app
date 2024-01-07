import { useContext } from 'react';
import { RecipeLocalStorageType } from '../../types';
import heartBlack from '../../images/blackHeartIcon.svg';
import heartWhite from '../../images/whiteHeartIcon.svg';
import share from '../../images/shareIcon.svg';
import { deleteLocalStorage, putLocalStorage } from '../../utils/locaStorage';
import styles from './InteractiveBtn.module.css';
import RecipesContext from '../../context/RecipesContext';

type InteractiveBtnProps = {
  srcShare?: typeof share;
  srcFavorite?: typeof heartBlack | typeof heartWhite;
  dataShare?: string;
  dataFavorite?: string;
  id?: string;
  type?: string;
  recipe?: RecipeLocalStorageType;
  handleIdLink?: (idLink: string, typeLink: string) => void;
};

export default function InteractiveBtn({
  srcShare,
  srcFavorite,
  dataShare,
  dataFavorite,
  id,
  type,
  recipe,
  handleIdLink,
}: InteractiveBtnProps = {}) {
  const { setShowAlert, setFavorites,
    setFilterRecipesStorage, setIsFavorite } = useContext(RecipesContext);

  const path = window.location.pathname.split('/')[1];
  const verifyPath = path !== 'done-recipes';

  const handleShare = (ID: string, TYPE: string) => {
    if (TYPE === 'meal') {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${ID}`);
      setShowAlert(true);
      if (handleIdLink) handleIdLink(ID, TYPE);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        3000,
      );
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${ID}`);
      setShowAlert(true);
      if (handleIdLink) handleIdLink(ID, TYPE);
      setTimeout(
        () => {
          setShowAlert(false);
        },
        3000,
      );
    }
  };

  const handleFavorite = (RECIPE: RecipeLocalStorageType, ID: string) => {
    if (srcFavorite === heartBlack) {
      deleteLocalStorage('favoriteRecipes', ID);
      setFavorites((prev) => prev.filter((item) => item.id !== ID));
      setFilterRecipesStorage((prev) => prev.filter((item) => item.id !== ID));
      setIsFavorite(false);
    } else {
      putLocalStorage('favoriteRecipes', RECIPE);
      setFavorites((prev) => [...prev, RECIPE]);
      setFilterRecipesStorage((prev) => prev.filter((item) => item.id !== ID));
      setIsFavorite(true);
    }
  };

  return (
    <div className={ styles.container_buttons }>
      { srcShare && (

        <button
          type="button"
          onClick={ () => handleShare(id as string, type as string) }
        >
          <img
            src={ srcShare }
            alt="Button share icon"
            data-testid={ dataShare }
          />
        </button>
      )}
      { verifyPath && srcFavorite && (

        <button
          type="button"
          onClick={ () => handleFavorite(recipe as RecipeLocalStorageType, id as string) }
        >
          <img
            src={ srcFavorite }
            alt={ `Button ${srcFavorite === heartBlack
              ? 'black' : 'white'} heart icon` }
            data-testid={ dataFavorite }
            className={ styles.favorite_icon }
          />
        </button>
      )}
    </div>
  );
}
