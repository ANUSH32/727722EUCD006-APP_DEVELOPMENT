import React from 'react';
// import Header from './landingPage/header/Header';
// import './app.css';
// import Hero from './landingPage/hero/Hero';
// import Opportunities from './landingPage/oppourtunities/Opportunities';
// import InvestSection from './landingPage/investsection/InvestSection';
// import Testimonials from './landingPage/testimonials/Testimonials';
// import FarmInvest from './landingPage/farmInvest/FarmInvest';
// import Footer from './landingPage/footer/Footer';
import HeaderLan from './LandingPage/HeaderLan';
import HeroLan from './LandingPage/Hero';
import '../LandingPage/Lan.css';

const App = () => {
  return (
    <div className="App">
       <div className="no-scroll">
            <HeaderLan />
            <HeroLan />
           
        </div>
    </div>
  );
}

export default App;
