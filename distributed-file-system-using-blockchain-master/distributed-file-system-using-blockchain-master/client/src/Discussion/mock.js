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

// Import the JSON data (ensure the path is correct)
import discussionsData from '../article.json';

const Mock = () => {
  const sidebarLinks = [
    { name: 'Home', icon: faHome, active: false },
    { name: 'Competition', icon: faTrophy, active: false },
    { name: 'Datasets', icon: faCode, active: false },
    { name: 'Discussions', icon: faComments, active: false },
    { name: 'Profile', icon: faUser, active: false }
  ];

  const navigate = useNavigate();

  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to parse time (e.g., "2 hours ago", "1 day ago")
  const parseTime = (timeString) => {
    const timePattern = /(\d+)\s*(hour|day|week|month)s?\s*ago/;
    const match = timeString.match(timePattern);
    
    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2];

      const now = new Date();
      if (unit === 'hour') now.setHours(now.getHours() - value);
      else if (unit === 'day') now.setDate(now.getDate() - value);
      else if (unit === 'week') now.setDate(now.getDate() - value * 7);
      else if (unit === 'month') now.setMonth(now.getMonth() - value);

      return now.getTime();
    }
    return 0; // Return 0 if time format is unrecognized
  };

  // Fetch discussions on component mount
  useEffect(() => {
    setDiscussions(discussionsData); // Set discussions from the JSON file
  }, []);

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter(discussion => {
      // Filter based on discussion type (recent, most-viewed, no-replies)
      if (filter === 'recent') return true;
      if (filter === 'most-viewed') return true;
      if (filter === 'no-replies') return discussion.comments === 0;
      return true;
    })
    .filter(discussion => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      // Ensure title, content, and tags exist before applying toLowerCase
      return (
        (discussion.title && discussion.title.toLowerCase().includes(lowerSearchTerm)) ||
        (discussion.content && discussion.content.toLowerCase().includes(lowerSearchTerm)) ||
        (discussion.tags && discussion.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm)))
      );
    })
    .sort((a, b) => {
      if (filter === 'most-viewed') {
        return b.views - a.views; // Sort by views descending
      } else if (filter === 'recent') {
        return parseTime(b.time) - parseTime(a.time); // Sort by date (most recent first)
      }
      return 0; // No sorting for 'all' filter
    });

  const handleNavigation = (linkName) => {
    const path = `/${linkName.toLowerCase()}`;
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
                placeholder="Search Discussions..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-button">New Discussion</button>
          </div>
        </div>

        {/* Filters */}
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

        {/* Display Discussions */}
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
      </div>
    </div>
  );
};

export default Mock;
