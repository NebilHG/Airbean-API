import "@fontsource/work-sans";
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProducts } from 'actions/orderActions';
import { userStatus } from 'actions/authActions';
import Navbar from 'components/Navbar/Navbar';
import StartView from 'views/StartView/StartView';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [displayStart, setDisplayStart] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    if (location.pathname === '/') {
      setDisplayStart(true);
      setTimeout(() => {setDisplayStart(false)}, 2000);
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem('user')) {
      dispatch(userStatus(setTokenExpired, navigate));
    }
  }, [location.pathname]);

  return (
    <div 
      className="app"
      style={location.pathname === '/profile' ? {backgroundColor: '#222222'} : null}
    >
      {displayStart && <StartView />}
      <Navbar/>
      <Outlet />
      <aside className={`app__token-expired ${tokenExpired ? 'active' : null}`}>
        Du har blivit utloggad!
      </aside>
    </div>
  );
};

export default App;
