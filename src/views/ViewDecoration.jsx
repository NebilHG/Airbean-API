import React from 'react';
import topImage from 'assets/topImage.svg';
import bottomImage from 'assets/bottomImage.svg';

const ViewDecoration = ({ children, bottomLess }) => {
  return (
    <>
        <img className="app__topImage" src={topImage} alt="topImage" />
        {children}
        {!bottomLess && <img className="app__bottomImage" src={bottomImage} alt="bottomImage" />}
    </>
  );
};

export default ViewDecoration;
