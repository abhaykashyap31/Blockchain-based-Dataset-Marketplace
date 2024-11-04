import React from 'react';
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

const mockPage = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome, active: false },
    { name: 'Competition', icon: faTrophy, active: false },
    { name: 'Model', icon: faCode, active: false },
    { name: 'Discussions', icon: faComments, active: false },
    { name: 'Profile', icon: faUser, active: false }
  ];

  const competitions = [
    {
      id: 1,
      prize: '$25,000',
      timeLeft: '28 days left',
      title: 'House Price Prediction Challenge',
      description: 'Predict house prices using advanced regression techniques',
      teams: '1,234 teams',
      imageUrl: '/api/placeholder/400/200'
    },
    {
      id: 2,
      prize: '$50,000',
      timeLeft: '15 days left',
      title: 'Natural Language Processing',
      description: 'Develop models for sentiment analysis on social media',
      teams: '2,567 teams',
      imageUrl: '/api/placeholder/400/200'
    },
    {
      id: 3,
      prize: '$30,000',
      timeLeft: '45 days left',
      title: 'Computer Vision Challenge',
      description: 'Object detection in autonomous driving scenarios',
      teams: '1,890 teams',
      imageUrl: '/api/placeholder/400/200'
    }
  ];

  return (
    <div className="container">
      {/* Fixed Sidebar */}
      <div className="sidebar">
        <div className="sidebar-links">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              className={`sidebar-link ${link.active ? 'active' : ''}`}
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

export default mockPage;
