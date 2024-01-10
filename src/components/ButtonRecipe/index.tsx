import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonRecipe.module.css';

type ButtonRecipeProps = {
  isDone: boolean;
  path: string;
  dataTestId: string;
  id: string;
};

export default function ButtonRecipe({ isDone,
  path, dataTestId, id }: ButtonRecipeProps) {
  const [nameButton, setNameButton] = useState('');
  const navigate = useNavigate();
  const pathPage = window.location.pathname;

  useEffect(() => {
    const checkNameButton = () => {
      if (pathPage.includes('in-progress')) {
        setNameButton('FINISH RECIPE');
      } else {
        if (isDone) {
          setNameButton('CONTINUE RECIPE');
          return;
        }
        setNameButton('START RECIPE');
      }
    };
    checkNameButton();
  }, [isDone, pathPage]);

  const handleButton = () => {
    navigate(`/${path}/${id}/in-progress`);
  };

  return (
    <button
      type="button"
      onClick={ handleButton }
      data-testid={ `${dataTestId}-recipe-btn` }
      className={ styles.recipe_btn }
    >
      { nameButton }
    </button>
  );
}
