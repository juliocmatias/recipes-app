import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../utils/locaStorage';
import done from '../../images/doneRecipeIcon.svg';
import favorite from '../../images/favoriteRecipeIcon.svg';
import logout from '../../images/logout.svg';
import styles from './Profile.module.css';
import { UserLocalStorageType } from '../../types';

function Profile() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userLocalStorage: UserLocalStorageType = getLocalStorage('user');
    if (userLocalStorage) {
      setEmail(userLocalStorage.email);
    }
  }, []);
  return (
    <>
      <div className={ styles.login_email }>
        <h4
          data-testid="profile-email"
        >
          { email }

        </h4>
      </div>
      <div className={ styles.container }>
        <div className={ styles.done_btn }>
          <img
            className={ styles.icon }
            src={ done }
            alt="Done Recipes button icon"
          />
          <button
            className={ styles.button }
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
          >
            Done Recipes
          </button>
        </div>
        <div className={ styles.favorite_btn }>
          <img
            className={ styles.icon }
            src={ favorite }
            alt="Favorite Recipes button icon"
          />
          <button
            className={ styles.button }
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
        </div>
        <div className={ styles.logout_btn }>
          <img
            className={ styles.icon }
            src={ logout }
            alt="Logout button icon"
          />
          <button
            className={ styles.button }
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              navigate('/');
            } }
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
