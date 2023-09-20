import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from 'assets/logo-dark.svg';
import './Auth.scss';
import { loginUser, signupUser } from 'actions/authActions';
import Loader from 'components/loader/Loader';

const Auth = ({ setUserSignedIn, userSignedIn }) => {
    const dispatch = useDispatch();
    let { isAuthLoading } = useSelector((state) => state.authReducer);
    const [toggleView, setToggleView] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');
    
    const handleToggleView = () => {
      setToggleView(!toggleView);
      setErrorMessage('');
      setVerifyMessage('');
    };

    const handleFormValidation = () => {
      setErrorMessage('');
      setVerifyMessage('');
      if (username.length < 3 || password.length < 6) {
        return false;
      }
      return true;
    }

    const handleLogin = () => {
      if(!handleFormValidation()) return setErrorMessage('Skriv in ditt användarnamn och lösenord');
      dispatch(loginUser({ username: username, password: password }, setUserSignedIn, setErrorMessage));
    };

    const handleSignup = () => {
      if(!handleFormValidation()) return setErrorMessage('Välj ett användarnamn, minst 3 tecken och lösenord, minst 6 tecken');
      dispatch(signupUser({ username: username, password: password }, handleToggleView, setVerifyMessage));
    };

  return (
    <section className={`app__auth ${userSignedIn ? 'closed' : null}`}>
      <section className={`app__auth--loading ${isAuthLoading ? 'active' : null}`}>
        <Loader />
        <p>Laddar...</p>
      </section>
      <figure className="app__auth--logo">
          <img src={logo} alt="logo" />
      </figure>
      <h2>
          Välkommen till AirBean-familjen!
      </h2>
      <p>
          {toggleView ? 
            'Genom att skapa ett konto nedan kan du spara och se din orderhistorik.' 
            : 
            'Logga in nedan för att se din orderhistorik.'
          }
      </p>

      <aside className="app__auth--input">
          <label htmlFor="username">
              Namn
          </label>
          <input 
            type="text" 
            placeholder="Sixten Kaffelovér" 
            id="usename" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      </aside>

      <aside className="app__auth--input">
          <label htmlFor="password">
              Lösenord
          </label>
          <input 
            style={{ letterSpacing: '5px' }} 
            type="password" 
            placeholder="•••••••" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </aside>

      <p className="app__auth--changeView">
          {toggleView ? 'Redan medlem? Logga in' : 'Inget konto? Skapa ett'}{' '}
          <span onClick={handleToggleView}>
            här
          </span>
      </p>
      <p className={`app__auth--error ${errorMessage.length > 2 ? 'active' : null}`}>{errorMessage}</p>
      <p className={`app__auth--verify ${verifyMessage.length > 2 ? 'active' : null}`}>{verifyMessage}</p>
      <button
        onClick={toggleView ? handleSignup : handleLogin}
      >
          {isAuthLoading ? 'Laddar...' : toggleView ? 'Skapa konto' : 'Logga in'}
      </button>
    </section>
  );
};

export default Auth;