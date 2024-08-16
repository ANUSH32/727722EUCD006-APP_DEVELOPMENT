import React from 'react';
import Nagri from './Nagri';
import profilePic2 from '../public/profile2.jpg';
import profilePic3 from '../public/profile3.jpg';
import profilePic4 from '../public/profile4.jpg';
import profilePic5 from '../public/profile5.jpg';

const imagePaths = [profilePic2, profilePic3, profilePic4, profilePic5];

function App() {
  return <Nagri images={imagePaths} />;
}

export default App;
