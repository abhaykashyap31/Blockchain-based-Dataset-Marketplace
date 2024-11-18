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
  faComment,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import discuss from './discuss2.webp';
import './discuss.css';

// Import the JSON data
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

  // Load discussions from localStorage or fallback to JSON data
  const [discussions, setDiscussions] = useState(() => {
    const storedDiscussions = localStorage.getItem('discussions');
    return storedDiscussions ? JSON.parse(storedDiscussions) : discussionsData;
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save discussions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('discussions', JSON.stringify(discussions));
  }, [discussions]);

  const handleNewDiscussion = () => {
    const newWindow = window.open('', '_blank', 'width=600,height=400');

    newWindow.document.write(`
      <html>
        <head>
          <title>New Discussion</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            h2 { color: #333; }
            .input-field { margin: 10px 0; padding: 8px; width: 80%; }
            .submit-btn { padding: 10px 20px; background-color: #007bff; color: #fff; border: none; cursor: pointer; }
            .submit-btn:hover { background-color: #0056b3; }
          </style>
        </head>
        <body>
          <h2>Create a New Discussion</h2>
          <input type="text" id="title" placeholder="Title" class="input-field" /><br />
          <textarea id="content" placeholder="Content" rows="5" class="input-field"></textarea><br />
          <input type="text" id="tags" placeholder="Tags (comma-separated)" class="input-field" /><br />
          <button id="submit" class="submit-btn">Submit</button>
          <script>
            document.getElementById('submit').addEventListener('click', () => {
              const title = document.getElementById('title').value.trim();
              const content = document.getElementById('content').value.trim();
              const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

              if (title && content && tags.length > 0) {
                window.opener.postMessage(
                  {
                    title,
                    content,
                    tags,
                    author: 'current_user', // Replace with actual user if available
                    time: 'Just now',
                    comments: 0,
                    views: 0
                  },
                  '*'
                );
                window.close();
              } else {
                alert('Please fill all fields correctly.');
              }
            });
          </script>
        </body>
      </html>
    `);
  };

  useEffect(() => {
    const handleNewDiscussionMessage = (event) => {
      const newDiscussion = event.data;

      if (newDiscussion && newDiscussion.title && newDiscussion.content) {
        setDiscussions((prevDiscussions) => [
          ...prevDiscussions,
          {
            id: prevDiscussions.length > 0 ? prevDiscussions[prevDiscussions.length - 1].id + 1 : 51,
            ...newDiscussion
          }
        ]);
      }
    };

    window.addEventListener('message', handleNewDiscussionMessage);

    return () => {
      window.removeEventListener('message', handleNewDiscussionMessage);
    };
  }, []);

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
    return 0;
  };

  const handleNavigation = (linkName) => {
    const path = `/${linkName.toLowerCase()}`;
    navigate(path);
  };

  const filteredDiscussions = discussions
    .filter((discussion) => {
      if (filter === 'recent') return true;
      if (filter === 'most-viewed') return true;
      if (filter === 'no-replies') return discussion.comments === 0;
      return true;
    })
    .filter((discussion) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        (discussion.title && discussion.title.toLowerCase().includes(lowerSearchTerm)) ||
        (discussion.content && discussion.content.toLowerCase().includes(lowerSearchTerm)) ||
        (discussion.tags && discussion.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm)))
      );
    })
    .sort((a, b) => {
      if (filter === 'most-viewed') {
        return b.views - a.views;
      } else if (filter === 'recent') {
        return parseTime(b.time) - parseTime(a.time);
      }
      return 0;
    });

  return (
    <div className="container">
      {/* Sidebar */}
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
            <button className="filter-button" onClick={handleNewDiscussion}>
              New Discussion
            </button>
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
              {btnFilter.replace('-', ' ').charAt(0).toUpperCase() +
                btnFilter.replace('-', ' ').slice(1)}
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
                      <FontAwesomeIcon icon={faComment} />
                      <span>{discussion.comments}</span>
                    </div>
                    <div className="stat">
                      <FontAwesomeIcon icon={faEye} />
                      <span>{discussion.views}</span>
                    </div>
                  </div>
                </div>
                <p className="discussion-body">{discussion.content}</p>
                <div className="tags">
                  {discussion.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No discussions found.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mock;
