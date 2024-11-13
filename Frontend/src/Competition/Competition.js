import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faTrophy,
  faCode,
  faComments,
  faUser,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import astro from "./compete2.png";
import './compete.css';

const Compete = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome, active: false },
    { name: 'Competition', icon: faTrophy, active: false },
    { name: 'Datasets', icon: faCode, active: false },
    { name: 'Discussions', icon: faComments, active: false },
    { name: 'Profile', icon: faUser, active: false }
  ];
  const navigate = useNavigate();

  const competitions = [
    {
      id: 1,
      prize: '$25,000',
      timeLeft: '28 days left',
      title: 'House Price Prediction Challenge',
      description: 'Predict house prices using advanced regression techniques',
      teams: '1,234 teams',
      imageUrl: 'https://clovermortgage.ca/media/images/iStock-1309180566-min.width-1024.jpg'
    },
    {
      id: 2,
      prize: '$50,000',
      timeLeft: '15 days left',
      title: 'Natural Language Processing',
      description: 'Develop models for sentiment analysis on social media',
      teams: '2,567 teams',
      imageUrl: 'https://th.bing.com/th/id/OIP.MsfVMY1muy4moxu0WKwCSwHaEH?rs=1&pid=ImgDetMain'
    },
    {
      id: 3,
      prize: '$30,000',
      timeLeft: '45 days left',
      title: 'Computer Vision Challenge',
      description: 'Object detection in autonomous driving scenarios',
      teams: '1,890 teams',
      imageUrl: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/22606/images/e2d450-1f8c-e71-2316-f27bc3f8622_TheGioiMayChu-Blog-Computer-Vision.jpeg'
    }
  ];

  const handleNavigation = (linkName) => {
    const path = `/${linkName.toLowerCase()}`; // Navigate to the lowercase version of linkName
    navigate(path);
  };


  return (
    <div className="container">
      {/* Fixed Sidebar */}
      <div className="sidebar">
        <div className="sidebar-links">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              className={`sidebar-link ${link.active ? 'active' : ''}`}
              onClick={() => handleNavigation(link.name)}
            >
              <FontAwesomeIcon icon={link.icon} className="sidebar-icon" />
              {link.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header and Search */}
        <div className="header-section">
          <div className="title-wrapper">
            <div className="earth">
            <img src={astro} alt="Data Science Illustration" />
            </div>
            <h1 className="page-title">Competitions</h1>
          </div>

          {/* Search and Filter Section */}
          <div className="search-section">
            <div className="search-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text"
                placeholder="Search competitions..." 
                className="search-input"
              />
            </div>
            <select className="select-box">
              <option>All Categories</option>
              <option>Featured</option>
              <option>Research</option>
              <option>Getting Started</option>
            </select>
          </div>
        </div>

        {/* Competition Grid */}
        <div className="competition-grid">
          {competitions.map((competition) => (
            <div key={competition.id} className="competition-card">
              <img
                src={competition.imageUrl}
                alt={competition.title}
                className="competition-image"
              />
              <div className="competition-content">
                <div className="competition-header">
                  <span className="prize-badge">{competition.prize}</span>
                  <span className="time-left">{competition.timeLeft}</span>
                </div>
                <h3 className="competition-title">{competition.title}</h3>
                <p className="competition-description">{competition.description}</p>
                <div className="competition-footer">
                  <div className="team-info">
                    <span>{competition.teams}</span>
                  </div>
                  <button className="join-button">
                    Join 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compete;
