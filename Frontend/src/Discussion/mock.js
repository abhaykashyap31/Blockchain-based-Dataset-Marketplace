import React, { useState, useEffect } from 'react';
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
import discuss from './discuss2.webp';
import './discuss.css';

const Mock = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome, active: false },
    { name: 'Competition', icon: faTrophy, active: false },
    { name: 'Datasets', icon: faCode, active: false },
    { name: 'Discussions', icon: faComments, active: false },
    { name: 'Profile', icon: faUser, active: false }
  ];

  const navigate = useNavigate();

  const initialDiscussions = [
    {
        id: 1,
        title: "Best approach for time series forecasting?",
        author: "data_explorer",
        time: "2 hours ago",
        comments: 23,
        views: 142,
        content: "I'm working on a project that requires forecasting daily sales data. What's the current best practice? SARIMA, Prophet, or neural networks?",
        tags: ["time-series", "forecasting", "machine-learning"],
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
        id: 2,
        title: "Tips for optimizing XGBoost parameters?",
        author: "ml_enthusiast",
        time: "5 hours ago",
        comments: 15,
        views: 98,
        content: "Looking for advice on tuning XGBoost hyperparameters for a classification task. Any systematic approaches?",
        tags: ["xgboost", "parameters", "optimization"],
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: "Neural Network Architecture for Image Classification",
        author: "deep_learner",
        time: "10 minutes ago",
        comments: 0,
        views: 12,
        content: "Working on a custom CNN architecture. Would love some feedback on the layer configuration.",
        tags: ["deep-learning", "CNN", "architecture"],
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
        id: 4,
        title: "Data Preprocessing Best Practices",
        author: "data_ninja",
        time: "1 day ago",
        comments: 45,
        views: 523,
        content: "What are your go-to techniques for handling missing data and outliers?",
        tags: ["preprocessing", "data-cleaning", "best-practices"],
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
];

const [discussions, setDiscussions] = useState(initialDiscussions);
const [filter, setFilter] = useState('all');
const [searchTerm, setSearchTerm] = useState('');

const filteredDiscussions = discussions
    .filter(discussion => {
        if (filter === 'recent') return true;
        if (filter === 'most-viewed') return true;
        if (filter === 'no-replies') return discussion.comments === 0;
        return true;
    })
    .filter(discussion => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            discussion.title.toLowerCase().includes(lowerSearchTerm) ||
            discussion.content.toLowerCase().includes(lowerSearchTerm) ||
            discussion.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
        );
    });


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
            <img src={discuss} alt="Data Science Illustration" />
          </div>
          <h1 className="page-title">Discussions</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text"
              placeholder="Search Articles..." 
              className="search-input"
            />   
        </div>
        <button className="filter-button">
            New Discussion
          </button>
        </div>
      </div>
      <div className="filters">
                {['all', 'recent', 'most-viewed', 'no-replies'].map((btnFilter) => (
                    <button
                        key={btnFilter}
                        className={`filter-btn ${filter === btnFilter ? 'active' : ''}`}
                        onClick={() => setFilter(btnFilter)}
                    >
                        {btnFilter.replace('-', ' ').charAt(0).toUpperCase() + btnFilter.replace('-', ' ').slice(1)}
                    </button>
                ))}
            </div>

            <div className="discussion-list">
                {filteredDiscussions.length > 0 ? (
                    filteredDiscussions.map((discussion) => (
                        <div className="discussion-card" key={discussion.id}>
                            <div className="discussion-header">
                                <div>
                                    <h3 className="discussion-title">{discussion.title}</h3>
                                    <div className="discussion-meta">
                                        <span>Started by @{discussion.author}</span>
                                        <span>{discussion.time}</span>
                                    </div>
                                </div>
                                <div className="stats">
                                    <div className="stat">
                                        <i className="fas fa-comment"></i>
                                        <span>{discussion.comments}</span>
                                    </div>
                                    <div className="stat">
                                        <i className="fas fa-eye"></i>
                                        <span>{discussion.views}</span>
                                    </div>
                                </div>
                            </div>
                            <p>{discussion.content}</p>
                            <div className="tags">
                                {discussion.tags.map((tag, index) => (
                                    <span className="tag" key={index}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-discussions">
                        <i className="fas fa-comments" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                        <p>No discussions found</p>
                    </div>
                )}
            </div>
        </div></div>
  );
};

export default Mock;