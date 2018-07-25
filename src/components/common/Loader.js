import React from 'react';
import { PulseLoader } from 'react-spinners';
import './Loader.css';

const Loader = () => (
  <div className='spinners-loading'>
    <PulseLoader
      color={'#ccc'}
    />
  </div>
);

export default Loader;