import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import leftImage from 'assets/leftImage.svg';
import rightImage from 'assets/rightImage.svg';
import logo from 'assets/logo.svg';
import './StartView.scss';

const StartView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location.pathname === '/') {
      navigate('/menu');
    }
  }, []);
  return (
    <section className="app__startview">
      <img src={leftImage} className="startview__left" alt="leftImage" />

      <figure className="startview__logo">
        <img src={logo} alt="logo" />
      </figure>
      <h2>
        AIR BEAN
      </h2>
      <p>
        DRONEDELIVERED COFFEE
      </p>

      <img src={rightImage} className="startview__right" alt="rightImage" />
    </section>
  );
};

export default StartView;