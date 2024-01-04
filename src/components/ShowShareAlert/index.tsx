import { useContext } from 'react';
import styles from './ShowShareAlert.module.css';
import RecipesContext from '../../context/RecipesContext';

export default function ShowShareAlert() {
  const { showAlert } = useContext(RecipesContext);
  return (
    showAlert && (
      <span>
        <h3 className={ styles.link_copied }>
          Link copied!
        </h3>
      </span>
    )
  );
}
