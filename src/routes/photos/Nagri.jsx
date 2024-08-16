import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './agri.css';

function Nagri() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const topics = [
    {
      title: 'Integrated Fish Farming',
      imageUrl: 'https://qph.cf2.quoracdn.net/main-qimg-2a2fba59acba2524c476afdcf24fb37a-lq',
    },
    {
      title: 'Home Stay',
      imageUrl: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/407653194.jpg?k=e6ae9831fd38620744a358751896a4a0ac701c9b3680cda53263a6791a47c8b2&o=',
    },
    {
      title: 'Rooftop Solar Installation',
      imageUrl: 'https://static.wixstatic.com/media/c87b49_9414f8a3ce104cc991dd964ade14c5ec~mv2.jpeg',
    },
    {
      title: 'Event Venues',
      imageUrl: 'https://www.coloradohomesmag.com/content/uploads/data-import/05c178fc/shutterstock291563126.jpg',
    },
    {
      title: 'Organic Farms',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/5876d713197aea0e7132b493/1618930648196-68POFBA64EX1LZTGXZAO/image-asset.jpeg',
    },
    {
      title: 'Storage Solutions',
      imageUrl: 'https://img.freepik.com/premium-photo/interior-modern-warehouse-large-space-storing-moving-goods-logistics-plastic-boxes-storing-small-items_331695-9205.jpg',
    },
    {
      title: 'Specialty Farming',
      imageUrl: 'https://www.benchmarklabs.com/wp-content/uploads/2022/04/Weather-Prediction-Using-Machine-Learning-Will-Help-Specialty-Agriculture-Featured-Image.webp',
    },
    {
      title: 'Green Initiatives',
      imageUrl: 'https://researchoutreach.org/wp-content/uploads/2021/11/shutterstock_1654924708.jpg',
    },
    {
      title: 'Educational Workshops on Gardening',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/5ffa2020fcd2563393904d92/3ebe2c7e-02c0-46e2-85f8-8aefd2069fa8/IMG_5285.JPG.jpg',
    },
  ];

  const handleClick = (profilePic, topic) => {
    navigate('/dashboard', { state: { profilePic, topic, answers: location.state?.answers } });
  };

  return (
    <div>
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="card-container">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="card" 
            onClick={() => handleClick(topic.imageUrl, topic.title)}
          >
            <img className="card-image" src={topic.imageUrl} alt={topic.title} />
            <div className="card-text">{topic.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nagri;
